import { useState } from "react";

function ReportListingPage({ tipe, daftarLaporan, bukaDetail, pindahHalaman }) {
  const [kataKunci, setKataKunci] = useState("");
  const [halamanAktif, setHalamanAktif] = useState(1);
  const batasPerHalaman = 4; // 4 kartu per baris sesuai desain desktop

  const isLost = tipe === "lost";
  const judulHalaman = isLost ? "Lost Item" : "Found Item";

  // Saring berdasarkan tipe (lost/found) dan kata kunci pencarian
  const hasilFilter = daftarLaporan.filter(
    (item) =>
      item.tipe === tipe &&
      item.namaBarang.toLowerCase().includes(kataKunci.toLowerCase())
  );

  const totalHalaman = Math.max(1, Math.ceil(hasilFilter.length / batasPerHalaman));
  const indeksAwal = (halamanAktif - 1) * batasPerHalaman;
  const itemTampil = hasilFilter.slice(indeksAwal, indeksAwal + batasPerHalaman);

  return (
    <div className="listing-wrapper">
      {/* Judul Halaman Bergradasi */}
      <h1 className="judul-halaman-gradasi">{judulHalaman}</h1>

      {/* Bar Pencarian + Tombol Lost/Found */}
      <div className="search-bar-row">
        <div className="search-input-box">
          <span>☰</span>
          <input
            type="text"
            placeholder="Item Name"
            value={kataKunci}
            onChange={(e) => {
              setKataKunci(e.target.value);
              setHalamanAktif(1);
            }}
          />
          <span>🔍</span>
        </div>

        <button
          className={`${isLost ? "btn-lost" : "btn-found"} search-action-btn`}
          onClick={() => pindahHalaman(isLost ? "report-lost" : "report-found")}
        >
          {isLost ? "Lost" : "Found"}
        </button>
      </div>

      {/* Grid 4 Kartu */}
      {itemTampil.length === 0 ? (
        <p style={{ color: "#6b7280", margin: "40px 0" }}>
          Belum ada data {judulHalaman.toLowerCase()} yang sesuai.
        </p>
      ) : (
        <div className="cards-grid">
          {itemTampil.map((item) => (
            <div key={item.id} className="item-card">
              {/* Header Kartu: Avatar + Nama & Tanggal */}
              <div className="card-header">
                <div className="card-avatar">
                  {item.pelapor.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div style={{ fontSize: "12px", fontWeight: "700" }}>{item.namaBarang}</div>
                  <div style={{ fontSize: "10px", color: "#6b7280" }}>{item.tanggal}</div>
                </div>
              </div>

              {/* Kotak Gambar */}
              <div className="card-image-placeholder">
                {item.foto ? (
                  <img src={item.foto} alt={item.namaBarang} />
                ) : (
                  <span>▲ ■ ●</span>
                )}
              </div>

              {/* Judul, Lokasi & Deskripsi */}
              <div>
                <div style={{ fontSize: "13px", fontWeight: "700" }}>{item.namaBarang}</div>
                <div style={{ fontSize: "11px", color: "#6b7280", marginBottom: "6px" }}>
                  {item.lokasi}
                </div>
                <p style={{ fontSize: "11px", color: "#4b5563", lineHeight: "1.4" }}>
                  {item.deskripsi.length > 75
                    ? item.deskripsi.slice(0, 75) + "..."
                    : item.deskripsi}
                </p>
              </div>

              {/* Tombol Contact */}
              <button className="btn-contact" onClick={() => bukaDetail(item)}>
                Contact
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination (jika data lebih dari 4) */}
      {totalHalaman > 1 && (
        <div style={{ display: "flex", gap: "8px", marginTop: "28px" }}>
          {Array.from({ length: totalHalaman }, (_, i) => i + 1).map((nomor) => (
            <button
              key={nomor}
              onClick={() => setHalamanAktif(nomor)}
              style={{
                padding: "6px 12px",
                borderRadius: "6px",
                border: "1px solid #d1d5db",
                backgroundColor: halamanAktif === nomor ? "#4c3b71" : "white",
                color: halamanAktif === nomor ? "white" : "#1f2937",
                cursor: "pointer",
              }}
            >
              {nomor}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReportListingPage;