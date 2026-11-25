// src/pages/ReportNew.jsx  -> route: /reports/new
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createReport } from "../api/reports";

const MAX_SIZE = 5 * 1024 * 1024; // 5 MB

export default function ReportNew() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", description: "", location: "" });
  const [photo, setPhoto] = useState(null);
  const [preview, setPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Bersihkan object URL supaya tidak bocor memori
  useEffect(() => {
    return () => preview && URL.revokeObjectURL(preview);
  }, [preview]);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onPhotoChange = (e) => {
    const file = e.target.files?.[0];
    setError("");
    if (!file) {
      setPhoto(null);
      setPreview("");
      return;
    }
    if (!file.type.startsWith("image/")) {
      setError("File harus berupa gambar.");
      return;
    }
    if (file.size > MAX_SIZE) {
      setError("Ukuran foto maksimal 5 MB.");
      return;
    }
    setPhoto(file);
    setPreview(URL.createObjectURL(file));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.description.trim()) {
      setError("Judul dan deskripsi wajib diisi.");
      return;
    }
    setSubmitting(true);
    setError("");
    try {
      const res = await createReport({ ...form, photo });
      const created = res.data ?? res;
      navigate(`/reports/${created.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main style={{ maxWidth: 560, margin: "0 auto", padding: 16 }}>
      <h1>Buat Laporan</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label>
          Judul
          <input name="title" value={form.title} onChange={onChange} required />
        </label>
        <label>
          Deskripsi
          <textarea
            name="description"
            rows={5}
            value={form.description}
            onChange={onChange}
            required
          />
        </label>
        <label>
          Lokasi
          <input name="location" value={form.location} onChange={onChange} />
        </label>
        <label>
          Foto
          <input type="file" accept="image/*" onChange={onPhotoChange} />
        </label>

        {preview && (
          <img
            src={preview}
            alt="Preview foto"
            style={{ maxWidth: "100%", maxHeight: 280, objectFit: "cover", borderRadius: 8 }}
          />
        )}

        {error && <p role="alert" style={{ color: "crimson" }}>{error}</p>}

        <button type="submit" disabled={submitting}>
          {submitting ? "Mengirim..." : "Kirim Laporan"}
        </button>
      </form>
    </main>
  );
}
