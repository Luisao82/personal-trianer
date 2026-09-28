async function call(path, pin, options = {}) {
  const res = await fetch(path, {
    ...options,
    headers: { "Content-Type": "application/json", "x-pin": pin },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    const err = new Error(body.error || "Error del servidor");
    err.status = res.status;
    throw err;
  }
  return res.json();
}

export const fetchSessions = (pin) => call("/api/sessions", pin);

export const pushSession = (pin, payload) =>
  call("/api/session", pin, { method: "POST", body: JSON.stringify(payload) });
