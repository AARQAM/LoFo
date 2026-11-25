// src/pages/ReportDetail.jsx  -> route: /reports/:id
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getReportById } from "../api/reports";

export default function ReportDetail() {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError("");

    getReportById(id)
      .then((data) => !cancelled && setReport(data.data ?? data))
      .catch((err) => !cancelled && setError(err.message))
      .finally(() => !cancelled && setLoading(false));

    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) return <p>Memuat laporan...</p>;
  if (error) return <p role="alert">Gagal memuat: {error}</p>;
  if (!report) return <p>Laporan tidak ditemukan.</p>;

  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: 16 }}>
      <Link to="/reports">← Kembali</Link>
      <h1>{report.title}</h1>
      {report.status && <p>Status: <strong>{report.status}</strong></p>}
      {report.created_at && (
        <p>Dibuat: {new Date(report.created_at).toLocaleString("id-ID")}</p>
      )}
      {report.location && <p>Lokasi: {report.location}</p>}
      {report.photo_url && (
        <img
          src={report.photo_url}
          alt={report.title}
          style={{ maxWidth: "100%", borderRadius: 8 }}
        />
      )}
      <p style={{ whiteSpace: "pre-wrap" }}>{report.description}</p>
    </main>
  );
}
