
import { useState } from "react";

function ReportListingPage({
  tipe,
  daftarLaporan,
  bukaDetail,
  pindahHalaman,
}) {
  const [kataKunciInput, setKataKunciInput] = useState("");
  const [kataKunci, setKataKunci] = useState("");
  const [kategoriDipilih, setKategoriDipilih] = useState("");
  const [lokasiDipilih, setLokasiDipilih] = useState("");
  const [filterTerbuka, setFilterTerbuka] = useState(false);
  const [halamanAktif, setHalamanAktif] = useState(1);
  const [pencarianTerbuka, setPencarianTerbuka] = useState(false);

  const batasPerHalaman = 4;

  const isLost = tipe === "lost";
  const judulHalaman = isLost ? "Lost Item" : "Found Item";

  // Mengambil daftar kategori dan lokasi yang tersedia.
  const daftarKategori = [
    ...new Set(
      daftarLaporan
        .filter((item) => item.tipe === tipe)
        .map((item) => item.kategori)
        .filter(Boolean)
    ),
  ].sort();

  const daftarLokasi = [
    ...new Set(
      daftarLaporan
        .filter((item) => item.tipe === tipe)
        .map((item) => item.lokasi)
        .filter(Boolean)
    ),
  ].sort();

  // Menjalankan pencarian.
  function jalankanPencarian() {
    setKataKunci(kataKunciInput.trim());
    setHalamanAktif(1);
  }

  // Search dan filter laporan.
  const hasilFilter = daftarLaporan.filter((item) => {
    if (item.tipe !== tipe) return false;

    const kata = kataKunci.toLowerCase();

    const cocokSearch =
      !kata ||
      [
        item.namaBarang,
        item.deskripsi,
        item.lokasi,
        item.kategori,
        item.pelapor,
      ].some((nilai) =>
        String(nilai || "").toLowerCase().includes(kata)
      );

    const cocokKategori =
      !kategoriDipilih || item.kategori === kategoriDipilih;

    const cocokLokasi =
      !lokasiDipilih || item.lokasi === lokasiDipilih;

    return cocokSearch && cocokKategori && cocokLokasi;
  });

  // Pagination.
  const totalHalaman = Math.max(
    1,
    Math.ceil(hasilFilter.length / batasPerHalaman)
  );

  const indeksAwal = (halamanAktif - 1) * batasPerHalaman;

  const itemTampil = hasilFilter.slice(
    indeksAwal,
    indeksAwal + batasPerHalaman
  );

  // Menghapus pencarian dan semua filter.
  function resetFilter() {
    setKataKunciInput("");
    setKataKunci("");
    setKategoriDipilih("");
    setLokasiDipilih("");
    setHalamanAktif(1);
  }

  return (
    <div className="listing-wrapper">
      <h1 className="judul-halaman-gradasi">{judulHalaman}</h1>

      {/* Search */}
      <div className="search-bar-row">
        <div className="search-input-box">

          {/* Tombol buka/tutup filter */}
          <button
            type="button"
            className="search-icon-btn"
            onClick={() => setFilterTerbuka(!filterTerbuka)}
            aria-label="Tampilkan atau sembunyikan filter"
            aria-expanded={filterTerbuka}
          >
            ☰
          </button>

          {/* Input pencarian */}
          <input
            type="text"
            placeholder="Cari nama barang, lokasi, deskripsi..."
            value={kataKunciInput}
            onChange={(e) => setKataKunciInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                jalankanPencarian();
              }
            }}
          />

          {/* Tombol jalankan pencarian */}
          <button
            type="button"
            className="search-icon-btn"
            onClick={() => {
              if (!pencarianTerbuka) {
                setPencarianTerbuka(true);
              } else {
                jalankanPencarian();
              }
            }}
            aria-label="Buka atau jalankan pencarian"
          >
            🔍
          </button>
        </div>

        <button
          className={`${isLost ? "btn-lost" : "btn-found"} search-action-btn`}
          onClick={() =>
            pindahHalaman(isLost ? "report-lost" : "report-found")
          }
        >
          {isLost ? "Lost" : "Found"}
        </button>
      </div>

      {/* Filter kategori dan lokasi */}
      {filterTerbuka && (
        <div className="filter-row">
          <select
            value={kategoriDipilih}
            onChange={(e) => {
              setKategoriDipilih(e.target.value);
              setHalamanAktif(1);
            }}
          >
            <option value="">Semua Kategori</option>

            {daftarKategori.map((kategori) => (
              <option key={kategori} value={kategori}>
                {kategori}
              </option>
            ))}
          </select>

          <select
            value={lokasiDipilih}
            onChange={(e) => {
              setLokasiDipilih(e.target.value);
              setHalamanAktif(1);
            }}
          >
            <option value="">Semua Lokasi</option>

            {daftarLokasi.map((lokasi) => (
              <option key={lokasi} value={lokasi}>
                {lokasi}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="btn-reset-filter"
            onClick={resetFilter}
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* Jumlah hasil */}
      <p className="hasil-count">
        Menampilkan {hasilFilter.length} laporan
      </p>

      {/* Daftar laporan */}
      {itemTampil.length === 0 ? (
        <div className="empty-result">
          <p>
            Tidak ada laporan yang sesuai dengan pencarian atau filter.
          </p>
          <button onClick={resetFilter}>
            Tampilkan Semua Laporan
          </button>
        </div>
      ) : (
        <div className="cards-grid">
          {itemTampil.map((item) => (
            <div key={item.id} className="item-card">
              <div className="card-header">
                <div className="card-avatar">
                  {(item.pelapor || "?").charAt(0).toUpperCase()}
                </div>

                <div>
                  <div style={{ fontSize: "12px", fontWeight: "700" }}>
                    {item.namaBarang}
                  </div>

                  <div style={{ fontSize: "10px", color: "#6b7280" }}>
                    {item.tanggal}
                  </div>
                </div>
              </div>

              <div className="card-image-placeholder">
                {item.foto ? (
                  <img src={item.foto} alt={item.namaBarang} />
                ) : (
                  <span>▲ ■ ●</span>
                )}
              </div>

              <div>
                <div style={{ fontSize: "13px", fontWeight: "700" }}>
                  {item.namaBarang}
                </div>

                <div
                  style={{
                    fontSize: "11px",
                    color: "#6b7280",
                    marginBottom: "6px",
                  }}
                >
                  {item.lokasi}
                </div>

                <p
                  style={{
                    fontSize: "11px",
                    color: "#4b5563",
                    lineHeight: "1.4",
                  }}
                >
                  {(item.deskripsi || "").length > 75
                    ? item.deskripsi.slice(0, 75) + "..."
                    : item.deskripsi}
                </p>
              </div>

              <button
                className="btn-contact"
                onClick={() => bukaDetail(item)}
              >
                Contact
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalHalaman > 1 && (
        <div className="pagination">
          <button
            disabled={halamanAktif === 1}
            onClick={() => setHalamanAktif((halaman) => halaman - 1)}
          >
            Previous
          </button>

          {Array.from(
            { length: totalHalaman },
            (_, i) => i + 1
          ).map((nomor) => (
            <button
              key={nomor}
              className={halamanAktif === nomor ? "active" : ""}
              onClick={() => setHalamanAktif(nomor)}
            >
              {nomor}
            </button>
          ))}

          <button
            disabled={halamanAktif === totalHalaman}
            onClick={() => setHalamanAktif((halaman) => halaman + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ReportListingPage;