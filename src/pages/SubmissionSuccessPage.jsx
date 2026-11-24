function SubmissionSuccessPage({ tipeTerakhir, pindahHalaman }) {
  const tujuan = tipeTerakhir || "lost";

  return (
    <div className="detail-wrapper" style={{ maxWidth: "500px", textAlign: "center" }}>
      <div className="detail-card">
        <div style={{ fontSize: "42px", marginBottom: "8px" }}>✅</div>
        <h2 className="judul-halaman-gradasi" style={{ fontSize: "1.6rem" }}>
          Report Submitted!
        </h2>
        <p style={{ fontSize: "13px", color: "#4b5563", marginBottom: "20px" }}>
          Terima kasih. Laporan barang Anda telah berhasil disimpan ke daftar.
        </p>

        <div style={{ display: "flex", gap: "12px" }}>
          <button
            className="btn-contact"
            onClick={() => pindahHalaman(tujuan)}
          >
            Lihat Daftar {tujuan === "lost" ? "Lost Item" : "Found Item"}
          </button>
          <button
            className="btn-form-reset"
            style={{ borderRadius: "999px" }}
            onClick={() => pindahHalaman("home")}
          >
            Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default SubmissionSuccessPage;