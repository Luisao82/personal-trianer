import { notion, checkPin, toRich, DATABASE_ID } from "./_notion.js";

// Crea o actualiza la sesión de una fecha (una fila por día de entrenamiento).
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Método no permitido" });
  if (!(await checkPin(req, res))) return;

  try {
    const { date, day, week, data, summary } = req.body || {};
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date || "") || !["A", "B", "C"].includes(day)) {
      return res.status(400).json({ error: "Datos de sesión no válidos" });
    }

    const properties = {
      Nombre: { title: [{ type: "text", text: { content: `Día ${day} - ${date}` } }] },
      Fecha: { date: { start: date } },
      Dia: { select: { name: day } },
      Semana: { number: Number(week) || 1 },
      Completada: { checkbox: !!data?.completed },
      Comentario: { rich_text: toRich(data?.comment || "") },
      Resumen: { rich_text: toRich(summary || "") },
      Datos: { rich_text: toRich(JSON.stringify(data || {})) },
    };
    if (data?.hombros) properties.Hombros = { select: { name: data.hombros } };
    if (data?.codos) properties.Codos = { select: { name: data.codos } };
    if (data?.munecas) properties["Muñecas"] = { select: { name: data.munecas } };

    const dbId = DATABASE_ID;
    const found = await notion(`/databases/${dbId}/query`, "POST", {
      filter: { property: "Fecha", date: { equals: date } },
      page_size: 1,
    });

    if (found.results.length) {
      await notion(`/pages/${found.results[0].id}`, "PATCH", { properties });
    } else {
      await notion("/pages", "POST", { parent: { database_id: dbId }, properties });
    }
    res.status(200).json({ ok: true });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
