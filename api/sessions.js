import { notion, checkPin, plain, DATABASE_ID } from "./_notion.js";

// Devuelve los datos guardados para recuperar el estado en un dispositivo nuevo.
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Método no permitido" });
  if (!(await checkPin(req, res))) return;

  try {
    const result = await notion(`/databases/${DATABASE_ID}/query`, "POST", {
      page_size: 100,
    });
    const sessions = [];
    for (const page of result.results) {
      const week = page.properties?.Semana?.number;
      const day = page.properties?.Dia?.select?.name;
      const raw = plain(page.properties?.Datos?.rich_text);
      if (!week || !day || !raw) continue;
      try {
        sessions.push({ id: `s${week}-${day}`, data: JSON.parse(raw) });
      } catch {
        // Fila con datos editados a mano que ya no son JSON válido: se ignora.
      }
    }
    res.status(200).json(sessions);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
