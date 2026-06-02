const BASE = import.meta.env.VITE_APPS_SCRIPT_URL as string;

// ── GET ─────────────────────────────────────────────
export async function fetchGuests() {
  const res = await fetch(`${BASE}?action=guests`);
  return res.json();
}

export async function fetchGuestbook() {
  const res = await fetch(`${BASE}?action=guestbook`);
  return res.json();
}

// ── POST ────────────────────────────────────────────
async function post(body: object) {
  const res = await fetch(BASE, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body),
  });
  return res.json();
}

export const submitRSVP = (data: {
  name: string; phone: string; email: string;
  guests: string; attending: string; meal: string; notes: string;
}) => post({ action: "rsvp", ...data });

export const submitGuestbook = (data: {
  name: string; relation: string; message: string;
}) => post({ action: "guestbook", ...data });
