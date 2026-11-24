import { useState } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import ReportListingPage from "./pages/ReportListingPage";
import SubmitReportPage from "./pages/SubmitReportPage";
import SubmissionSuccessPage from "./pages/SubmissionSuccessPage";
import ReportDetailPage from "./pages/ReportDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const [halaman, setHalaman] = useState("home");
  const [menuTerbuka, setMenuTerbuka] = useState(false);
  const [itemTerpilih, setItemTerpilih] = useState(null);
  const [tipeTerakhir, setTipeTerakhir] = useState("lost");

  const [daftarLaporan, setDaftarLaporan] = useState([
    { id: 1, tipe: "lost", pelapor: "Andi", namaBarang: "Dompet Kulit Coklat", lokasi: "Perpustakaan Lt. 2", tanggal: "24/11/2026", kontak: "+62 812 3456 7890", deskripsi: "Tertinggal di meja baca dekat jendela, berisi KTM dan kartu ATM." },
    { id: 2, tipe: "lost", pelapor: "Budi", namaBarang: "Tumbler Corkcicle Hitam", lokasi: "Kantin Utama", tanggal: "24/11/2026", kontak: "+62 813 9876 5432", deskripsi: "Ada stiker kecil di bagian bawah botol, tertinggal saat jam makan siang." },
    { id: 3, tipe: "lost", pelapor: "Citra", namaBarang: "Kunci Motor Honda", lokasi: "Parkiran Barat", tanggal: "23/11/2026", kontak: "+62 857 1122 3344", deskripsi: "Gantungan kunci berbentuk karakter kucing warna abu-abu." },
    { id: 4, tipe: "lost", pelapor: "Dimas", namaBarang: "Earphone TWS Putih", lokasi: "Gedung C Ruang 301", tanggal: "22/11/2026", kontak: "+62 878 5566 7788", deskripsi: "Casing putih polos, tertinggal di laci meja baris kedua." },
    { id: 5, tipe: "found", pelapor: "Eka", namaBarang: "Payung Lipat Biru", lokasi: "Lobby Utama", tanggal: "24/11/2026", kontak: "+62 812 0000 1111", deskripsi: "Ditemukan di rak payung dekat pintu masuk utama." },
    { id: 6, tipe: "found", pelapor: "Fajar", namaBarang: "Flashdisk Sandisk 32GB", lokasi: "Lab Komputer 1", tanggal: "24/11/2026", kontak: "+62 819 2233 4455", deskripsi: "Menancap di PC nomor 14 setelah kelas pagi selesai." },
    { id: 7, tipe: "found", pelapor: "Gita", namaBarang: "Kacamata Frame Hitam", lokasi: "Musholla", tanggal: "23/11/2026", kontak: "+62 821 6677 8899", deskripsi: "Ditemukan di area tempat wudhu dalam kondisi baik." },
    { id: 8, tipe: "found", pelapor: "Hadi", namaBarang: "Charger Laptop Type-C", lokasi: "Gazebo Taman", tanggal: "22/11/2026", kontak: "+62 852 9988 7766", deskripsi: "Tergeletak di bangku kayu gazebo tengah." },
  ]);

  function navigasiKe(tujuan) {
    setHalaman(tujuan);
    setMenuTerbuka(false);
  }

  function bukaDetail(item) {
    setItemTerpilih(item);
    setHalaman("detail");
  }

  function tambahLaporanBaru(laporanBaru) {
    setDaftarLaporan([laporanBaru, ...daftarLaporan]);
    setTipeTerakhir(laporanBaru.tipe);
    setHalaman("success");
  }

  return (
    <div className="lofo-bg" style={{ position: "relative" }}>
      {/* Header */}
      <header className="lofo-header">
        <div className="lofo-logo" onClick={() => navigasiKe("home")}>
          <span style={{ fontSize: "24px" }}>📦</span>
          <div>
            <div className="lofo-logo-title">LoFo</div>
            <div className="lofo-logo-sub">Lost and Found</div>
          </div>
        </div>

        <button
          onClick={() => setMenuTerbuka(!menuTerbuka)}
          style={{ background: "none", border: "none", fontSize: "24px", cursor: "pointer", color: "#374151" }}
          aria-label="Menu"
        >
          ☰
        </button>

        {menuTerbuka && (
          <div className="nav-drawer">
            <button onClick={() => navigasiKe("home")}>Home</button>
            <button onClick={() => navigasiKe("lost")}>Lost Item</button>
            <button onClick={() => navigasiKe("found")}>Found Item</button>
            <button onClick={() => navigasiKe("report-lost")}>Report Lost Item</button>
            <button onClick={() => navigasiKe("report-found")}>Report Found Item</button>
          </div>
        )}
      </header>

      {/* Konten Utama */}
      <main className="lofo-main">
        {halaman === "home" && <HomePage pindahHalaman={navigasiKe} />}
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
          <SubmitReportPage tipe="lost" onTambahLaporan={tambahLaporanBaru} />
        )}
        {halaman === "report-found" && (
          <SubmitReportPage tipe="found" onTambahLaporan={tambahLaporanBaru} />
        )}
        {halaman === "success" && (
          <SubmissionSuccessPage tipeTerakhir={tipeTerakhir} pindahHalaman={navigasiKe} />
        )}
        {halaman === "detail" && (
          <ReportDetailPage item={itemTerpilih} pindahHalaman={navigasiKe} />
        )}
        {![
          "home",
          "lost",
          "found",
          "report-lost",
          "report-found",
          "success",
          "detail",
        ].includes(halaman) && <NotFoundPage pindahHalaman={navigasiKe} />}
      </main>

      {/* Footer */}
      <footer className="lofo-footer">
        <div className="lofo-logo" onClick={() => navigasiKe("home")}>
          <span style={{ fontSize: "20px" }}>📦</span>
          <div>
            <div className="lofo-logo-title" style={{ fontSize: "14px" }}>LoFo</div>
            <div className="lofo-logo-sub">Lost and Found</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;