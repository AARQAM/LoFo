function ReportDetailPage({ item, pindahHalaman }) {
  if (!item) {
    return (
      <div style={{ textAlign: "center" }}>
        <p>Item tidak ditemukan.</p>
        <button className="btn-contact" onClick={() => pindahHalaman("home")}>
          Kembali ke Home
        </button>
      </div>
    );
  }

  return (
    <div className="detail-wrapper">
      <button
        onClick={() => pindahHalaman(item.tipe)}
        style={{ background: "none", border: "none", color: "#4c3b71", fontWeight: "700", cursor: "pointer", marginBottom: "12px" }}
      >
        ← Kembali ke {item.tipe === "lost" ? "Lost Item" : "Found Item"}
      </button>

      <div className="detail-card">
        <div className="detail-image-box">
          {item.foto ? <img src={item.foto} alt={item.namaBarang} /> : <span>▲ ■ ●</span>}
        </div>

        <h2 className="judul-halaman-gradasi" style={{ fontSize: "1.75rem", marginBottom: "8px" }}>
          Item Details
        </h2>

        <div className="detail-info-list">
          <div><strong>Name:</strong> {item.pelapor}</div>
          <div><strong>Item :</strong> {item.namaBarang}</div>
          <div><strong>Contact :</strong> {item.kontak}</div>
          <div><strong>Location :</strong> {item.lokasi}</div>
          <div><strong>Date :</strong> {item.tanggal}</div>
          <div><strong>Description :</strong> {item.deskripsi}</div>
        </div>
      </div>
    </div>
  );
}

export default ReportDetailPage;