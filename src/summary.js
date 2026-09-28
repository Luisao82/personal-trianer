import { DAYS } from "./plan.js";

export const formatDate = (d) =>
  new Date(d + "T12:00:00").toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long" });

// Texto legible que se guarda en Notion para poder leerlo de un vistazo.
export function buildSummary(entry, s) {
  const day = DAYS[entry.day];
  const lines = [`Día ${entry.day} (${day.name}), semana ${entry.week}${s.date ? `, entrenada el ${s.date}` : ""}`];
  for (const e of day.exercises) {
    const cfg = e.weeks[entry.week - 1];
    const done = (s.done?.[e.id] || []).filter(Boolean).length;
    let l = `${e.name}: ${done}/${cfg.sets} series (objetivo ${cfg.target})`;
    if (s.result?.[e.id]) l += ` | resultado: ${s.result[e.id]}`;
    if (s.rir?.[e.id]) l += ` | RIR: ${s.rir[e.id]}`;
    lines.push(l);
  }
  lines.push(`Hombros: ${s.hombros || "sin marcar"} | Codos: ${s.codos || "sin marcar"} | Muñecas: ${s.munecas || "sin marcar"}`);
  if (s.comment) lines.push(`Comentario: ${s.comment}`);
  lines.push(s.completed ? "Sesión completada" : "Sesión sin completar");
  return lines.join("\n");
}
