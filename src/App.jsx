import { useCallback, useEffect, useRef, useState } from "react";
import { SESSIONS, DAYS, WARMUP, WEEK_RULES } from "./plan.js";
import { fetchSessions, pushSession } from "./api.js";
import { buildSummary, buildFisioSummary, formatDate } from "./summary.js";
import { FISIO, FISIO_INTRO } from "./fisio.js";

// v2: las sesiones se identifican por id (s1-A...) en lugar de por fecha.
const STORE_KEY = "calistenia-log-v2";
const PIN_KEY = "calistenia-pin";
const ESTADOS = ["Bien", "Molestia", "Dolor"];
const RIRS = ["0", "1", "2", "3+"];

const emptySession = () => ({
  done: {}, result: {}, rir: {},
  hombros: "", codos: "", munecas: "",
  date: "", comment: "", completed: false, updatedAt: 0, synced: true,
});

// Fisio: una entrada por día, con id "f-AAAA-MM-DD".
const emptyFisio = (date) => ({
  done: {}, estado: "", date, comment: "", completed: false, updatedAt: 0, synced: true,
});
const fisioId = (date) => `f-${date}`;
const emptyFor = (id) => (id.startsWith("f-") ? emptyFisio(id.slice(2)) : emptySession());
const fisioEntries = (store) =>
  Object.keys(store).filter((k) => k.startsWith("f-")).map((k) => ({ id: k, kind: "fisio", date: k.slice(2) }));
const fisioDone = (s) => FISIO.reduce((n, e) => n + (s?.done?.[e.id] || []).filter(Boolean).length, 0);
const FISIO_TOTAL = FISIO.reduce((n, e) => n + e.sets, 0);

const loadStore = () => {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch { return {}; }
};

const todayISO = () => {
  const d = new Date();
  const p = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};

const doneCount = (entry, s) =>
  DAYS[entry.day].exercises.reduce((n, e) => n + (s?.done?.[e.id] || []).filter(Boolean).length, 0);
const totalSets = (entry) =>
  DAYS[entry.day].exercises.reduce((n, e) => n + e.weeks[entry.week - 1].sets, 0);

export default function App() {
  const [pin, setPin] = useState(() => localStorage.getItem(PIN_KEY) || "");
  const [authed, setAuthed] = useState(false);
  const [store, setStore] = useState(loadStore);
  const [syncError, setSyncError] = useState("");
  const [open, setOpen] = useState(null);
  const [screen, setScreen] = useState("home");
  const [fisioDate, setFisioDate] = useState(todayISO);

  const storeRef = useRef(store);
  storeRef.current = store;
  const syncing = useRef(false);

  useEffect(() => {
    localStorage.setItem(STORE_KEY, JSON.stringify(store));
  }, [store]);

  const logout = useCallback(() => {
    localStorage.removeItem(PIN_KEY);
    setPin("");
    setAuthed(false);
    setScreen("home");
  }, []);

  // Trae lo guardado en Notion. Devuelve "ok", "denied", "offline" o "error:<mensaje>".
  const hydrate = useCallback(async (p) => {
    try {
      const remote = await fetchSessions(p);
      setStore((prev) => {
        const out = { ...prev };
        for (const r of remote) {
          const local = out[r.id];
          if (!local || (local.synced && (r.data.updatedAt || 0) > local.updatedAt)) {
            out[r.id] = { ...emptyFor(r.id), ...r.data, synced: true };
          }
        }
        return out;
      });
      setSyncError("");
      return "ok";
    } catch (e) {
      if (e.status === 401) return "denied";
      setSyncError(e.status ? "error" : "offline");
      return e.status ? `error:${e.message}` : "offline";
    }
  }, []);

  useEffect(() => {
    if (!pin) return;
    hydrate(pin).then((r) => (r === "denied" ? logout() : setAuthed(true)));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const sync = useCallback(async () => {
    if (syncing.current || !pin) return;
    syncing.current = true;
    try {
      for (const entry of [...SESSIONS, ...fisioEntries(storeRef.current)]) {
        const s = storeRef.current[entry.id];
        if (!s || s.synced) continue;
        const stamp = s.updatedAt;
        const { synced, ...data } = s;
        if (entry.kind === "fisio") {
          await pushSession(pin, { id: entry.id, kind: "fisio", data, summary: buildFisioSummary(entry.date, s) });
        } else {
          await pushSession(pin, { id: entry.id, day: entry.day, week: entry.week, data, summary: buildSummary(entry, s) });
        }
        setStore((prev) => {
          const cur = prev[entry.id];
          return cur && cur.updatedAt === stamp ? { ...prev, [entry.id]: { ...cur, synced: true } } : prev;
        });
      }
      setSyncError("");
    } catch (e) {
      if (e.status === 401) logout();
      else setSyncError(e.status ? "error" : "offline");
    } finally {
      syncing.current = false;
    }
  }, [pin, logout]);

  const pending = Object.values(store).some((s) => !s.synced);

  useEffect(() => {
    if (!authed || !pending) return;
    const t = setTimeout(sync, syncError ? 15000 : 1200);
    return () => clearTimeout(t);
  }, [store, authed, pending, sync, syncError]);

  useEffect(() => {
    window.addEventListener("online", sync);
    return () => window.removeEventListener("online", sync);
  }, [sync]);

  // La fecha del entreno se pone sola con hoy la primera vez que se toca algo.
  const update = (id, fn) =>
    setStore((prev) => {
      const next = fn(structuredClone(prev[id] || emptySession()));
      if (!next.date) next.date = todayISO();
      next.updatedAt = Date.now();
      next.synced = false;
      return { ...prev, [id]: next };
    });

  // Igual que update, pero para el fisio de un día (la fecha es la del id).
  const updateFisio = (date, fn) =>
    setStore((prev) => {
      const id = fisioId(date);
      const next = fn(structuredClone(prev[id] || emptyFisio(date)));
      next.date = date;
      next.updatedAt = Date.now();
      next.synced = false;
      return { ...prev, [id]: next };
    });

  if (!authed) {
    return <Login onEnter={async (p) => {
      const r = await hydrate(p);
      if (r === "denied") return "PIN incorrecto.";
      if (r === "offline") return "Hace falta conexión la primera vez que entras.";
      if (r.startsWith("error:")) return `El servidor respondió: ${r.slice(6)}`;
      localStorage.setItem(PIN_KEY, p);
      setPin(p);
      setAuthed(true);
      return "";
    }} />;
  }

  const status = syncError === "offline" ? ["Sin conexión, guardado en el móvil", "warn"]
    : syncError ? ["Error al sincronizar, reintentando", "bad"]
    : pending ? ["Guardando…", "warn"] : ["Guardado en Notion", "ok"];

  const entry = SESSIONS.find((c) => c.id === open);

  return (
    <div className="app">
      <header className="top">
        <h1>{entry ? `Día ${entry.day}` : screen === "home" ? "Diario de calistenia" : screen === "fisio" ? "Fisio" : "Sesiones"}</h1>
        <span className={`status ${status[1]}`} role="status">{status[0]}</span>
      </header>
      {entry ? (
        <SessionView
          entry={entry}
          s={store[entry.id] || emptySession()}
          update={(fn) => update(entry.id, fn)}
          back={() => setOpen(null)}
        />
      ) : screen === "home" ? (
        <Home onStart={() => setScreen("sessions")} onFisio={() => setScreen("fisio")} onLogout={logout} />
      ) : screen === "fisio" ? (
        <FisioView
          store={store}
          date={fisioDate}
          setDate={setFisioDate}
          update={(fn) => updateFisio(fisioDate, fn)}
          back={() => setScreen("home")}
        />
      ) : (
        <SessionList store={store} onOpen={setOpen} onHome={() => setScreen("home")} />
      )}
    </div>
  );
}

function Login({ onEnter }) {
  const [value, setValue] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setMsg(await onEnter(value));
    setBusy(false);
  };
  return (
    <div className="app login">
      <h1>Diario de calistenia</h1>
      <form onSubmit={submit}>
        <label htmlFor="pin">PIN de acceso</label>
        <input id="pin" type="password" inputMode="numeric" autoComplete="current-password"
          value={value} onChange={(e) => setValue(e.target.value)} />
        {msg && <p className="msg" role="alert">{msg}</p>}
        <button className="primary" disabled={busy || !value}>{busy ? "Comprobando…" : "Entrar"}</button>
      </form>
    </div>
  );
}

function Home({ onStart, onFisio, onLogout }) {
  return (
    <main className="home">
      <img className="logo" src="/logo.png" width="320" height="320" alt="Personal Trianer" />
      <p className="lead">
        Calistenia y control corporal, tres sesiones por semana. Marca cada serie, apunta cómo están hombros, codos y muñecas y todo se guarda en Notion.
      </p>
      <button className="primary" onClick={onStart}>Entrenar</button>
      <button className="secondary" onClick={onFisio}>Fisio</button>
      <button className="link" onClick={onLogout}>Cerrar sesión en este móvil</button>
    </main>
  );
}

function SessionList({ store, onOpen, onHome }) {
  const next = SESSIONS.find((c) => !store[c.id]?.completed);
  return (
    <main>
      <button className="link" onClick={onHome}>Volver al inicio</button>
      {[1, 2].map((week) => (
        <section key={week}>
          <h2>Semana {week}</h2>
          <p className="rule">{WEEK_RULES[week]}</p>
          <ul className="cards">
            {SESSIONS.filter((c) => c.week === week).map((c) => {
              const s = store[c.id];
              const done = doneCount(c, s);
              const total = totalSets(c);
              const isNext = next?.id === c.id;
              return (
                <li key={c.id}>
                  <button className={`card ${s?.completed ? "finished" : ""} ${isNext ? "next" : ""}`} onClick={() => onOpen(c.id)}>
                    <span className="letter" aria-hidden="true">{c.day}</span>
                    <span className="info">
                      <strong>{DAYS[c.day].name}</strong>
                      <span>{s?.date ? `Entrenada el ${formatDate(s.date)}` : "Sin empezar"}</span>
                      <span className="meter"><i style={{ width: `${(done / total) * 100}%` }} /></span>
                    </span>
                    <span className="tag">
                      {s?.completed ? "Completada" : isNext ? "Siguiente" : `${done}/${total}`}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </main>
  );
}

function SessionView({ entry, s, update, back }) {
  const day = DAYS[entry.day];
  const toggle = (ex, i, sets) =>
    update((d) => {
      const arr = d.done[ex.id]?.slice() || Array(sets).fill(false);
      arr[i] = !arr[i];
      d.done[ex.id] = arr;
      return d;
    });
  const setField = (field, value) => update((d) => ({ ...d, [field]: value }));
  const setMap = (field, id, value) =>
    update((d) => {
      d[field][id] = d[field][id] === value && field === "rir" ? "" : value;
      return d;
    });

  return (
    <main>
      <button className="link" onClick={back}>Volver a las sesiones</button>
      <h2>{day.name}</h2>
      <p className="rule">
        Semana {entry.week}{s.date ? `, entrenada el ${formatDate(s.date)}` : ""}. {WEEK_RULES[entry.week]}
      </p>

      <details className="warmup">
        <summary>Calentamiento (8-10 min)</summary>
        <ul>{WARMUP.map((w) => <li key={w}>{w}</li>)}</ul>
      </details>

      {day.exercises.map((ex) => {
        const cfg = ex.weeks[entry.week - 1];
        const done = s.done[ex.id] || [];
        return (
          <section className={`exercise ${ex.block}`} key={ex.id}>
            <div className="ex-head">
              <h3>{ex.name}</h3>
              <span className="target">{cfg.sets} x {cfg.target}</span>
            </div>
            {ex.note && <p className="note">{ex.note}</p>}
            <div className="sets" role="group" aria-label={`Series de ${ex.name}`}>
              {Array.from({ length: cfg.sets }, (_, i) => (
                <button key={i} className={`set ${done[i] ? "on" : ""}`} aria-pressed={!!done[i]}
                  aria-label={`Serie ${i + 1}`} onClick={() => toggle(ex, i, cfg.sets)}>
                  {i + 1}
                </button>
              ))}
            </div>
            <details className="extra">
              <summary>Resultado y esfuerzo (opcional)</summary>
              <label>Lo que hiciste (reps o segundos)
                <input value={s.result[ex.id] || ""} placeholder="ej. 5-5-4 o 8 s"
                  onChange={(e) => setMap("result", ex.id, e.target.value)} />
              </label>
              <div className="rir" role="group" aria-label="Repeticiones en reserva">
                <span>Reps en reserva</span>
                {RIRS.map((r) => (
                  <button key={r} className={s.rir[ex.id] === r ? "on" : ""} aria-pressed={s.rir[ex.id] === r}
                    onClick={() => setMap("rir", ex.id, r)}>{r}</button>
                ))}
              </div>
            </details>
          </section>
        );
      })}

      <section className="wrap">
        <h3>Cómo están al terminar (o al día siguiente)</h3>
        {[["hombros", "Hombros"], ["codos", "Codos"], ["munecas", "Muñecas"]].map(([key, label]) => (
          <div className="estado" key={key} role="group" aria-label={label}>
            <span>{label}</span>
            {ESTADOS.map((e) => (
              <button key={e} className={`${s[key] === e ? "on" : ""} ${e.toLowerCase()}`} aria-pressed={s[key] === e}
                onClick={() => setField(key, s[key] === e ? "" : e)}>{e}</button>
            ))}
          </div>
        ))}
        {[s.hombros, s.codos, s.munecas].includes("Dolor") && (
          <p className="alert" role="alert">Si es dolor punzante y no fatiga, quita ese ejercicio y cuéntamelo antes de la siguiente sesión.</p>
        )}
        <label>Día que entrenaste
          <input type="date" value={s.date} max={todayISO()} onChange={(e) => setField("date", e.target.value)} />
        </label>
        <label>Comentario (opcional)
          <textarea rows="3" value={s.comment} onChange={(e) => setField("comment", e.target.value)} />
        </label>
        <button className={`primary ${s.completed ? "undo" : ""}`} onClick={() => setField("completed", !s.completed)}>
          {s.completed ? "Sesión completada. Desmarcar" : "Marcar sesión completada"}
        </button>
      </section>
    </main>
  );
}

const shortDate = (d) => new Date(d + "T12:00:00").toLocaleDateString("es-ES", { day: "numeric", month: "short" });

function FisioView({ store, date, setDate, update, back }) {
  const s = store[fisioId(date)] || emptyFisio(date);
  const toggle = (ex, i) =>
    update((d) => {
      const arr = d.done[ex.id]?.slice() || Array(ex.sets).fill(false);
      arr[i] = !arr[i];
      d.done[ex.id] = arr;
      return d;
    });
  const setField = (field, value) => update((d) => ({ ...d, [field]: value }));
  const recent = fisioEntries(store).map((e) => e.date).sort().reverse().slice(0, 7);
  const done = fisioDone(s);

  return (
    <main>
      <button className="link" onClick={back}>Volver al inicio</button>
      <h2>Rutina del fisio</h2>
      <p className="rule">{FISIO_INTRO}</p>

      <label className="daypick">Día
        <input type="date" value={date} max={todayISO()} onChange={(e) => e.target.value && setDate(e.target.value)} />
      </label>
      {recent.length > 0 && (
        <div className="recent" role="group" aria-label="Últimos días con fisio">
          <span>Últimos días</span>
          {recent.map((d) => {
            const r = store[fisioId(d)];
            return (
              <button key={d} aria-pressed={d === date}
                className={`chip ${d === date ? "on" : ""} ${r?.completed ? "finished" : ""}`}
                onClick={() => setDate(d)}>
                {shortDate(d)} · {fisioDone(r)}/{FISIO_TOTAL}
              </button>
            );
          })}
        </div>
      )}
      <p className="progress">
        {s.completed ? "Fisio completada" : `${done}/${FISIO_TOTAL} series`}
        <span className="meter"><i style={{ width: `${(done / FISIO_TOTAL) * 100}%` }} /></span>
      </p>

      {FISIO.map((ex) => {
        const marks = s.done[ex.id] || [];
        return (
          <section className="exercise" key={ex.id}>
            <div className="fisio-art" role="img" aria-label={`Dibujo del ejercicio: ${ex.name}`}
              style={{ backgroundImage: `url(/fisio/${ex.id}.png)` }} />
            <div className="ex-head">
              <h3>{ex.name}</h3>
              <span className="target">{ex.sets} x {ex.target}</span>
            </div>
            <p className="zone">{ex.zone}</p>
            <p className="note">{ex.note}</p>
            <div className="sets" role="group" aria-label={`Series de ${ex.name}`}>
              {Array.from({ length: ex.sets }, (_, i) => (
                <button key={i} className={`set ${marks[i] ? "on" : ""}`} aria-pressed={!!marks[i]}
                  aria-label={`Serie ${i + 1}`} onClick={() => toggle(ex, i)}>
                  {i + 1}
                </button>
              ))}
            </div>
          </section>
        );
      })}

      <section className="wrap">
        <h3>Cómo estás</h3>
        <div className="estado" role="group" aria-label="Cómo estás">
          {ESTADOS.map((e) => (
            <button key={e} className={`${s.estado === e ? "on" : ""} ${e.toLowerCase()}`} aria-pressed={s.estado === e}
              onClick={() => setField("estado", s.estado === e ? "" : e)}>{e}</button>
          ))}
        </div>
        {s.estado === "Dolor" && (
          <p className="alert" role="alert">Si es dolor punzante, para ese ejercicio y coméntalo con el fisio.</p>
        )}
        <label>Comentario (opcional)
          <textarea rows="3" value={s.comment} onChange={(e) => setField("comment", e.target.value)} />
        </label>
        <button className={`primary ${s.completed ? "undo" : ""}`} onClick={() => setField("completed", !s.completed)}>
          {s.completed ? "Fisio completada. Desmarcar" : "Marcar fisio completada"}
        </button>
      </section>
    </main>
  );
}
