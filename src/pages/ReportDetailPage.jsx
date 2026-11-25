
import { useEffect, useState } from "react";
import { getReportById } from "../api/reports";

function ReportDetailPage({ item, pindahHalaman }) {
  const [laporan, setLaporan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!item?.id) {
      setLoading(false);
      setError("Item tidak ditemukan.");
      return;
    }

    let aktif = true;

    async function ambilDetailLaporan() {
      try {
        setLoading(true);
        setError("");

        const response = await getReportById(item.id);
        const data = response.data;

        if (!aktif) return;

        setLaporan({
          id: data.id,
          tipe: data.type.toLowerCase(),
          pelapor: data.reporterName,
          namaBarang: data.title,
          kontak: data.contact?.value || null,
          lokasi: data.location,
          tanggal: new Date(data.createdAt).toLocaleDateString("id-ID"),
          deskripsi: data.description,
          kategori: data.category?.name || "Lainnya",
          foto: data.images?.length
            ? typeof data.images[0] === "string"
              ? data.images[0]
              : data.images[0].url
            : null,
        });
      } catch (err) {
        if (aktif) {
          setError(err.message || "Gagal mengambil detail laporan.");
        }
      } finally {
        if (aktif) {
          setLoading(false);
        }
      }
    }

    ambilDetailLaporan();

    return () => {
      aktif = false;
    };
  }, [item?.id]);

  if (loading) {
    return (
      <div className="detail-wrapper" style={{ textAlign: "center" }}>
        <p>Loading detail laporan...</p>
      </div>
    );
  }

  if (error || !laporan) {
    return (
      <div className="detail-wrapper" style={{ textAlign: "center" }}>
        <p>{error || "Item tidak ditemukan."}</p>

        <button
          className="btn-contact"
          onClick={() => pindahHalaman("home")}
        >
          Kembali ke Home
        </button>
      </div>
    );
  }

  return (
    <div className="detail-wrapper">
      <button
        onClick={() => pindahHalaman(laporan.tipe)}
        style={{
          background: "none",
          border: "none",
          color: "#4c3b71",
          fontWeight: "700",
          cursor: "pointer",
          marginBottom: "12px",
        }}
      >
        ← Kembali ke {laporan.tipe === "lost" ? "Lost Item" : "Found Item"}
      </button>

      <div className="detail-card">
        <div className="detail-image-box">
          {laporan.foto ? (
            <img src={laporan.foto} alt={laporan.namaBarang} />
          ) : (
            <span>▲ ■ ●</span>
          )}
        </div>

        <h2
          className="judul-halaman-gradasi"
          style={{ fontSize: "1.75rem", marginBottom: "8px" }}
        >
          Item Details
        </h2>

        <div className="detail-info-list">
          <div>
            <strong>Name:</strong> {laporan.pelapor}
          </div>

          <div>
            <strong>Item:</strong> {laporan.namaBarang}
          </div>

          <div>
            <strong>Category:</strong> {laporan.kategori}
          </div>

          <div>
            <strong>Contact:</strong>{" "}
            {laporan.kontak || "Kontak tidak tersedia."}
          </div>

          <div>
            <strong>Location:</strong> {laporan.lokasi}
          </div>

          <div>
            <strong>Date:</strong> {laporan.tanggal}
          </div>

          <div>
            <strong>Description:</strong> {laporan.deskripsi}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReportDetailPage;