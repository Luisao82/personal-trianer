import { notion, checkPin, plain, DATABASE_ID } from "./_notion.js";

// Devuelve los datos guardados para recuperar el estado en un dispositivo nuevo.
// Incluye las sesiones de entreno (id "s1-A") y las filas de fisio (id "f-2026-10-07").
// Con una fila de fisio al día la base de datos crece, así que se pagina.
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Método no permitido" });
  if (!(await checkPin(req, res))) return;

  try {
    const sessions = [];
    let cursor;
    for (let guard = 0; guard < 20; guard++) {
      const result = await notion(`/databases/${DATABASE_ID}/query`, "POST", {
        page_size: 100,
        ...(cursor ? { start_cursor: cursor } : {}),
      });
      for (const page of result.results) {
        const week = page.properties?.Semana?.number;
        const day = page.properties?.Dia?.select?.name;
        const raw = plain(page.properties?.Datos?.rich_text);
        if (!day || !raw) continue;

        let id;
        if (day === "Fisio") {
          const date = page.properties?.Fecha?.date?.start;
          if (!date) continue;
          id = `f-${date}`;
        } else {
          if (!week) continue;
          id = `s${week}-${day}`;
        }
        try {
          sessions.push({ id, data: JSON.parse(raw) });
        } catch {
          // Fila con datos editados a mano que ya no son JSON válido: se ignora.
        }
      }
      if (!result.has_more) break;
      cursor = result.next_cursor;
    }
    res.status(200).json(sessions);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
