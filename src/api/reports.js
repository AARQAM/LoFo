
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

async function handleResponse(res) {
  const body = await res.json();

  if (!res.ok) {
    throw new Error(body.message || `Request gagal (${res.status})`);
  }

  return body;
}

// Mengambil daftar laporan.
export async function getReports(params = {}) {
  const query = new URLSearchParams(params).toString();

  const res = await fetch(
    `${BASE_URL}/reports${query ? `?${query}` : ""}`
  );

  return handleResponse(res);
}

// Mengambil detail satu laporan.
export async function getReportById(id) {
  const res = await fetch(`${BASE_URL}/reports/${id}`);
  return handleResponse(res);
}

// Mengambil daftar kategori.
export async function getCategories() {
  const res = await fetch(`${BASE_URL}/categories`);
  return handleResponse(res);
}

// Mengirim laporan baru.
export async function createReport({
  title,
  description,
  type,
  categoryId,
  location,
  reporterName,
  contactMethod,
  contactValue,
  isContactPublic = false,
}) {
  const res = await fetch(`${BASE_URL}/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      description,
      type,
      categoryId,
      location,
      reporterName,
      contactMethod,
      contactValue,
      isContactPublic,
    }),
  });

  return handleResponse(res);
}