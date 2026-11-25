
import { useEffect, useState } from "react";
import { getCategories, createReport } from "../api/reports";

function SubmitReportPage({ tipe, onTambahLaporan }) {
  const isLost = tipe === "lost";
  const judulForm = isLost ? "Report Lost Item" : "Report Found Item";

  const [pelapor, setPelapor] = useState("");
  const [namaBarang, setNamaBarang] = useState("");
  const [kontak, setKontak] = useState("");
  const [lokasi, setLokasi] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [foto, setFoto] = useState("");

  const [daftarKategori, setDaftarKategori] = useState([]);
  const [kategori, setKategori] = useState("");
  const [kontakPublik, setKontakPublik] = useState(false);

  const [kategoriLoading, setKategoriLoading] = useState(true);
  const [sedangMengirim, setSedangMengirim] = useState(false);
  const [pesanError, setPesanError] = useState("");

  // Mengambil kategori dari backend.
  useEffect(() => {
    async function muatKategori() {
      try {
        const response = await getCategories();
        setDaftarKategori(response.data);
      } catch (error) {
        console.error("Gagal mengambil kategori:", error);
        setPesanError("Gagal memuat kategori barang.");
      } finally {
        setKategoriLoading(false);
      }
    }

    muatKategori();
  }, []);

  function handleUploadFoto(e) {
    const file = e.target.files[0];

    if (!file) return;

    setFoto(URL.createObjectURL(file));
  }

  function handleReset() {
    setPelapor("");
    setNamaBarang("");
    setKontak("");
    setLokasi("");
    setTanggal("");
    setDeskripsi("");
    setFoto("");
    setKategori("");
    setKontakPublik(false);
    setPesanError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (
      !pelapor.trim() ||
      !namaBarang.trim() ||
      !kategori ||
      !lokasi ||
      !deskripsi.trim()
    ) {
      setPesanError("Mohon lengkapi seluruh data yang wajib diisi.");
      return;
    }

    if (kontakPublik && !kontak.trim()) {
      setPesanError(
        "Isi kontak terlebih dahulu jika ingin menampilkannya secara publik."
      );
      return;
    }

    try {
      setSedangMengirim(true);
      setPesanError("");

      const response = await createReport({
        title: namaBarang.trim(),
        description: deskripsi.trim(),
        type: tipe.toUpperCase(),
        categoryId: kategori,
        location: lokasi,
        reporterName: pelapor.trim(),
        contactMethod: kontakPublik ? "OTHER" : "",
        contactValue: kontakPublik ? kontak.trim() : "",
        isContactPublic: kontakPublik,
      });

      // Mengirim data hasil backend ke App.jsx.
      onTambahLaporan(response.data);
    } catch (error) {
      console.error("Gagal mengirim laporan:", error);
      setPesanError(
        error.message || "Laporan gagal dikirim. Silakan coba lagi."
      );
    } finally {
      setSedangMengirim(false);
    }
  }

  return (
    <div className="form-wrapper">
      <h1 className="judul-halaman-gradasi">{judulForm}</h1>

      <form className="form-box" onSubmit={handleSubmit}>
        <div className="form-row">
          <label>Name :</label>
          <input
            type="text"
            className="form-input"
            value={pelapor}
            onChange={(e) => setPelapor(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label>Item :</label>
          <input
            type="text"
            className="form-input"
            value={namaBarang}
            onChange={(e) => setNamaBarang(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label>Category :</label>
          <select
            className="form-select"
            value={kategori}
            onChange={(e) => setKategori(e.target.value)}
            required
            disabled={kategoriLoading}
          >
            <option value="">
              {kategoriLoading ? "Loading categories..." : "Pilih kategori..."}
            </option>

            {daftarKategori.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-row">
          <label>Contact details :</label>
          <input
            type="text"
            className="form-input"
            placeholder="+62 812 0000 0000"
            value={kontak}
            onChange={(e) => setKontak(e.target.value)}
          />
        </div>

        <div style={{ margin: "12px 0" }}>
          <label
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "flex-start",
            }}
          >
            <input
              type="checkbox"
              checked={kontakPublik}
              onChange={(e) => setKontakPublik(e.target.checked)}
            />

            <span style={{ fontSize: "12px" }}>
              Saya menyetujui informasi kontak saya ditampilkan secara publik
              pada halaman detail laporan.
            </span>
          </label>
        </div>

        <div className="form-row">
          <label>Location :</label>
          <select
            className="form-select"
            value={lokasi}
            onChange={(e) => setLokasi(e.target.value)}
            required
          >
            <option value="">Pilih lokasi...</option>
            <option value="Perpustakaan">Perpustakaan</option>
            <option value="Kantin Utama">Kantin Utama</option>
            <option value="Lobby Utama">Lobby Utama</option>
            <option value="Area Parkir">Area Parkir</option>
            <option value="Ruang Kelas / Lab">Ruang Kelas / Lab</option>
          </select>
        </div>

        <div className="form-row">
          <label>Date :</label>
          <input
            type="date"
            className="form-input"
            value={tanggal}
            onChange={(e) => setTanggal(e.target.value)}
          />
        </div>

        <div className="form-row align-top">
          <label>Item Description :</label>
          <textarea
            rows="3"
            className="form-textarea"
            value={deskripsi}
            onChange={(e) => setDeskripsi(e.target.value)}
            required
          />
        </div>

        <div className="form-row">
          <label>
            Upload Photo : <br />
            <span style={{ fontSize: "10px", fontWeight: "400" }}>
              (upload if available)
            </span>
          </label>

          <label className="upload-box">
            <span>
              {foto ? "Foto terpilih ✓ (Klik untuk ganti)" : "⬆ Pilih Foto"}
            </span>

            <input
              type="file"
              accept="image/*"
              onChange={handleUploadFoto}
              hidden
            />
          </label>
        </div>

        {foto && (
          <div style={{ margin: "12px 0" }}>
            <img
              src={foto}
              alt="Preview barang"
              style={{
                width: "150px",
                height: "120px",
                objectFit: "cover",
                borderRadius: "8px",
              }}
            />
          </div>
        )}

        {pesanError && (
          <p style={{ color: "#dc2626", fontSize: "13px" }}>
            {pesanError}
          </p>
        )}

        <div className="form-actions-row">
          <button
            type="submit"
            className="btn-form-submit"
            disabled={sedangMengirim || kategoriLoading}
          >
            {sedangMengirim ? "Submitting..." : "Submit"}
          </button>

          <button
            type="button"
            onClick={handleReset}
            className="btn-form-reset"
            disabled={sedangMengirim}
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubmitReportPage;