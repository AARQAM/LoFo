
import { useEffect, useState } from "react";
import "./App.css";
import logoLofo from "./assets/logolofo.png";

import { getReports } from "./api/reports";

import HomePage from "./pages/HomePage";
import ReportListingPage from "./pages/ReportListingPage";
import SubmitReportPage from "./pages/SubmitReportPage";
import SubmissionSuccessPage from "./pages/SubmissionSuccessPage";
import ReportDetailPage from "./pages/ReportDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

// Mengubah format data backend menjadi format yang digunakan frontend.
function ubahFormatLaporan(report) {
  const tanggal = report.createdAt
    ? new Date(report.createdAt).toLocaleDateString("id-ID")
    : "-";

  // Backend hanya mengirim contact jika reporter memberi izin.
  const kontak = report.contact
    ? report.contact.value
    : null;

  // Mengambil foto pertama jika tersedia.
  const foto = Array.isArray(report.images) && report.images.length > 0
    ? typeof report.images[0] === "string"
      ? report.images[0]
      : report.images[0].url
    : null;

  return {
    id: report.id,
    tipe: report.type.toLowerCase(),
    pelapor: report.reporterName,
    namaBarang: report.title,
    lokasi: report.location,
    tanggal,
    kontak,
    deskripsi: report.description,
    foto,
    kategori: report.category?.name || "Lainnya",
  };
}

function App() {
  const [halaman, setHalaman] = useState("home");
  const [menuTerbuka, setMenuTerbuka] = useState(false);
  const [itemTerpilih, setItemTerpilih] = useState(null);
  const [tipeTerakhir, setTipeTerakhir] = useState("lost");

  const [daftarLaporan, setDaftarLaporan] = useState([]);
  const [sedangMemuat, setSedangMemuat] = useState(true);
  const [pesanError, setPesanError] = useState("");

  // Mengambil laporan dari backend ketika aplikasi pertama kali dibuka.
  useEffect(() => {
    async function muatLaporan() {
      try {
        setSedangMemuat(true);
        setPesanError("");

        const response = await getReports({ limit: 50 });

        const laporan = response.data.map(ubahFormatLaporan);
        setDaftarLaporan(laporan);
      } catch (error) {
        console.error("Gagal mengambil laporan:", error);
        setPesanError(
          "Gagal memuat laporan. Pastikan backend LoFo sedang berjalan."
        );
      } finally {
        setSedangMemuat(false);
      }
    }

    muatLaporan();
  }, []);

  function navigasiKe(tujuan) {
    setHalaman(tujuan);
    setMenuTerbuka(false);
  }

  function bukaDetail(item) {
    setItemTerpilih(item);
    setHalaman("detail");
  }

  // Dipanggil setelah laporan baru berhasil dikirim ke backend.
  function tambahLaporanBaru(reportDariBackend) {
    const laporanBaru = ubahFormatLaporan(reportDariBackend);

  setDaftarLaporan((laporanSebelumnya) => [
    laporanBaru,
    ...laporanSebelumnya,
  ]);

  setTipeTerakhir(laporanBaru.tipe);
  setHalaman("success");
}

  return (
    <div className="lofo-bg" style={{ position: "relative" }}>
      {/* Header */}
      <header className="lofo-header">
        <div className="lofo-logo" onClick={() => navigasiKe("home")}>
          <img src={logoLofo} alt="Logo LoFo" className="lofo-logo-img" />
          <div>
            <div className="lofo-logo-title">LoFo</div>
            <div className="lofo-logo-sub">Lost and Found</div>
          </div>
        </div>

        <button
          onClick={() => setMenuTerbuka(!menuTerbuka)}
          style={{
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "#374151",
          }}
          aria-label="Menu"
        >
          ☰
        </button>

        {menuTerbuka && (
          <div className="nav-drawer">
            <button onClick={() => navigasiKe("home")}>Home</button>
            <button onClick={() => navigasiKe("lost")}>Lost Item</button>
            <button onClick={() => navigasiKe("found")}>Found Item</button>
            <button onClick={() => navigasiKe("report-lost")}>
              Report Lost Item
            </button>
            <button onClick={() => navigasiKe("report-found")}>
              Report Found Item
            </button>
          </div>
        )}
      </header>

      {/* Konten Utama */}
      <main className="lofo-main">
        {sedangMemuat && (
          <p style={{ textAlign: "center", padding: "24px" }}>
            Memuat laporan...
          </p>
        )}

        {!sedangMemuat && pesanError && (
          <p style={{ textAlign: "center", color: "#dc2626", padding: "24px" }}>
            {pesanError}
          </p>
        )}

        {!sedangMemuat && !pesanError && (
          <>
            {halaman === "home" && (
              <HomePage pindahHalaman={navigasiKe} />
            )}

            {halaman === "lost" && (
              <ReportListingPage
                tipe="lost"
                daftarLaporan={daftarLaporan}
                bukaDetail={bukaDetail}
                pindahHalaman={navigasiKe}
              />
            )}

            {halaman === "found" && (
              <ReportListingPage
                tipe="found"
                daftarLaporan={daftarLaporan}
                bukaDetail={bukaDetail}
                pindahHalaman={navigasiKe}
              />
            )}

            {halaman === "report-lost" && (
              <SubmitReportPage
                tipe="lost"
                onTambahLaporan={tambahLaporanBaru}
              />
            )}

            {halaman === "report-found" && (
              <SubmitReportPage
                tipe="found"
                onTambahLaporan={tambahLaporanBaru}
              />
            )}

            {halaman === "success" && (
              <SubmissionSuccessPage
                tipeTerakhir={tipeTerakhir}
                pindahHalaman={navigasiKe}
              />
            )}

            {halaman === "detail" && (
              <ReportDetailPage
                item={itemTerpilih}
                pindahHalaman={navigasiKe}
              />
            )}

            {![
              "home",
              "lost",
              "found",
              "report-lost",
              "report-found",
              "success",
              "detail",
            ].includes(halaman) && (
              <NotFoundPage pindahHalaman={navigasiKe} />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="lofo-footer">
        <div className="lofo-logo" onClick={() => navigasiKe("home")}>
          <img
            src={logoLofo}
            alt="Logo LoFo"
            className="lofo-logo-img footer-logo"
          />
          <div>
            <div className="lofo-logo-title" style={{ fontSize: "14px" }}>
              LoFo
            </div>
            <div className="lofo-logo-sub">Lost and Found</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;