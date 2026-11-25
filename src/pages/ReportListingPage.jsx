
import { useState } from "react";

function ReportListingPage({
  tipe,
  daftarLaporan,
  bukaDetail,
  pindahHalaman,
}) {
  const [kataKunci, setKataKunci] = useState("");
  const [kategoriDipilih, setKategoriDipilih] = useState("");
  const [lokasiDipilih, setLokasiDipilih] = useState("");
  const [filterTerbuka, setFilterTerbuka] = useState(false);
  const [halamanAktif, setHalamanAktif] = useState(1);
  const [pencarianTerbuka, setPencarianTerbuka] = useState(false);

  const batasPerHalaman = 4;

  const isLost = tipe === "lost";
  const judulHalaman = isLost ? "Lost Item" : "Found Item";

  const laporanSesuaiTipe = daftarLaporan.filter(
    (item) => item.tipe === tipe
  );

  const daftarKategori = [
    ...new Set(
      laporanSesuaiTipe
        .map((item) => item.kategori)
        .filter(Boolean)
    ),
  ].sort();

  const daftarLokasi = [
    ...new Set(
      laporanSesuaiTipe
        .map((item) => item.lokasi)
        .filter(Boolean)
    ),
  ].sort();

  // Search dan filter laporan.
  const hasilFilter = laporanSesuaiTipe.filter((item) => {
    const kata = kataKunci.trim().toLowerCase();

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

  const halamanAman = Math.min(halamanAktif, totalHalaman);
  const indeksAwal = (halamanAman - 1) * batasPerHalaman;

  const itemTampil = hasilFilter.slice(
    indeksAwal,
    indeksAwal + batasPerHalaman
  );

  // Reset pencarian dan filter.
  function resetFilter() {
    setKataKunci("");
    setKategoriDipilih("");
    setLokasiDipilih("");
    setHalamanAktif(1);
  }

  return (
    <div className="listing-wrapper">
      <h1 className="judul-halaman-gradasi">
        {judulHalaman}
      </h1>

      {/* Search Bar */}
      <div className="search-bar-row">
        <div className="search-input-box">

          {/* Tombol Filter */}
          <button
            type="button"
            className="search-icon-btn"
            onClick={() => setFilterTerbuka(!filterTerbuka)}
            aria-label="Tampilkan atau sembunyikan filter"
            aria-expanded={filterTerbuka}
          >
            ☰
          </button>

          {/* Input Search hanya muncul saat ikon diklik */}
          {pencarianTerbuka && (
            <input
              type="text"
              placeholder="Cari nama barang, lokasi, deskripsi..."
              value={kataKunci}
              autoFocus
              onChange={(e) => {
                setKataKunci(e.target.value);
                setHalamanAktif(1);
              }}
            />
          )}

          {/* Tombol Hapus Search */}
          {kataKunci && (
            <button
              type="button"
              className="search-icon-btn"
              onClick={() => {
                setKataKunci("");
                setHalamanAktif(1);
              }}
              aria-label="Hapus pencarian"
            >
              ✕
            </button>
          )}

          {/* Tombol Buka/Tutup Search */}
          <button
            type="button"
            className="search-icon-btn"
            onClick={() => {
              setPencarianTerbuka(!pencarianTerbuka);
            }}
            aria-label={
              pencarianTerbuka
                ? "Tutup pencarian"
                : "Buka pencarian"
            }
            aria-expanded={pencarianTerbuka}
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

      {/* Filter Kategori dan Lokasi */}
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

      {/* Jumlah Hasil */}
      <p className="hasil-count">
        Menampilkan {hasilFilter.length} laporan
      </p>

      {/* Daftar Laporan */}
      {itemTampil.length === 0 ? (
        <div className="empty-result">
          <p>
            {laporanSesuaiTipe.length === 0
              ? "Belum ada laporan untuk kategori ini."
              : "Tidak ada laporan yang sesuai dengan pencarian atau filter."}
          </p>

          {(kataKunci || kategoriDipilih || lokasiDipilih) && (
            <button onClick={resetFilter}>
              Tampilkan Semua Laporan
            </button>
          )}
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
            disabled={halamanAman === 1}
            onClick={() =>
              setHalamanAktif((halaman) => halaman - 1)
            }
          >
            Previous
          </button>

          {Array.from(
            { length: totalHalaman },
            (_, i) => i + 1
          ).map((nomor) => (
            <button
              key={nomor}
              className={halamanAman === nomor ? "active" : ""}
              onClick={() => setHalamanAktif(nomor)}
            >
              {nomor}
            </button>
          ))}

          <button
            disabled={halamanAman === totalHalaman}
            onClick={() =>
              setHalamanAktif((halaman) => halaman + 1)
            }
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default ReportListingPage;