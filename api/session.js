import { notion, checkPin, toRich, DATABASE_ID } from "./_notion.js";

// Crea o actualiza una sesión. Se identifica por su nombre ("Semana 1 - Día A").
// La fecha del entreno es opcional: se rellena cuando la persona entrena.
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });
  if (!(await checkPin(req, res))) return;

  try {
    const { id, day, week, data, summary } = req.body || {};
    if (!/^s\d+-[ABC]$/.test(id || "") || !["A", "B", "C"].includes(day) || !Number.isInteger(week) || week < 1) {
      return res.status(400).json({ error: "Datos de sesión no válidos" });
    }
    const date = /^\d{4}-\d{2}-\d{2}$/.test(data?.date || "") ? data.date : null;
    const nombre = `Semana ${week} - Día ${day}`;

    const properties = {
      Nombre: { title: [{ type: "text", text: { content: nombre } }] },
      Fecha: { date: date ? { start: date } : null },
      Dia: { select: { name: day } },
      Semana: { number: week },
      Completada: { checkbox: !!data?.completed },
      Comentario: { rich_text: toRich(data?.comment || "") },
      Resumen: { rich_text: toRich(summary || "") },
      Datos: { rich_text: toRich(JSON.stringify(data || {})) },
    };
    if (data?.hombros) properties.Hombros = { select: { name: data.hombros } };
    if (data?.codos) properties.Codos = { select: { name: data.codos } };
    if (data?.munecas) properties["Muñecas"] = { select: { name: data.munecas } };

    const found = await notion(`/databases/${DATABASE_ID}/query`, "POST", {
      filter: { property: "Nombre", title: { equals: nombre } },
      page_size: 1,
    });

    if (found.results.length) {
      await notion(`/pages/${found.results[0].id}`, "PATCH", { properties });
    } else {
      await notion("/pages", "POST", { parent: { database_id: DATABASE_ID }, properties });
    }
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
