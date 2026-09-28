import { timingSafeEqual } from "node:crypto";

const BASE = "https://api.notion.com/v1";

// Base de datos "Sesiones de calistenia" (dentro de la página "Entrenamiento").
// El id no es un secreto: sin el token de la integración no da acceso a nada.
export const DATABASE_ID = process.env.NOTION_DATABASE_ID || "dbb97279-1045-46e1-b47c-b650e2aa58e6";

export async function notion(path, method = "GET", body) {
  const res = await fetch(BASE + path, {
    method,
    headers: {
      Authorization: `Bearer ${process.env.NOTION_TOKEN}`,
      "Notion-Version": "2022-06-28",
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Error de Notion");
  return json;
}

// Comprueba el PIN sin filtrar información por tiempo de respuesta.
export async function checkPin(req, res) {
  const expected = Buffer.from(process.env.APP_PIN || "");
  const got = Buffer.from(String(req.headers["x-pin"] || ""));
  const ok = expected.length > 0 && expected.length === got.length && timingSafeEqual(expected, got);
  if (!ok) {
    await new Promise((r) => setTimeout(r, 500));
    res.status(401).json({ error: "PIN incorrecto" });
  }
  return ok;
}

// Notion limita cada bloque de texto a 2000 caracteres.
export function toRich(text, size = 1900) {
  const out = [];
  for (let i = 0; i < text.length && out.length < 100; i += size) {
    out.push({ type: "text", text: { content: text.slice(i, i + size) } });
  }
  return out;
}

export const plain = (rich = []) => rich.map((r) => r.plain_text).join("");
