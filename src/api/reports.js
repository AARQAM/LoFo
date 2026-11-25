// src/api/reports.js
const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

async function handle(res) {
  if (!res.ok) {
    let message = `Request gagal (${res.status})`;
    try {
      const body = await res.json();
      message = body.message ?? message;
    } catch {
      /* body bukan JSON */
    }
    throw new Error(message);
  }
  return res.json();
}

// GET /reports/:id
export async function getReportById(id) {
  const res = await fetch(`${BASE_URL}/reports/${id}`);
  return handle(res);
}

// POST /reports  (multipart/form-data supaya bisa kirim foto)
export async function createReport({ title, description, location, photo }) {
  const form = new FormData();
  form.append("title", title);
  form.append("description", description);
  if (location) form.append("location", location);
  if (photo) form.append("photo", photo);

 
  const res = await fetch(`${BASE_URL}/reports`, { method: "POST", body: form });
  return handle(res);
}
