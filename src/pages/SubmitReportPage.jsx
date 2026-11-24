import { useState } from "react";

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
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!pelapor.trim() || !namaBarang.trim()) return;

    onTambahLaporan({
      id: Date.now(),
      tipe,
      pelapor,
      namaBarang,
      kontak: kontak || "+62 800 0000 0000",
      lokasi: lokasi || "Area Kampus",
      tanggal: tanggal || new Date().toLocaleDateString("id-ID"),
      deskripsi: deskripsi || "Tidak ada keterangan tambahan.",
      foto,
    });
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
          <label>Contact details :</label>
          <input
            type="text"
            className="form-input"
            placeholder="+62 812 0000 0000"
            value={kontak}
            onChange={(e) => setKontak(e.target.value)}
          />
        </div>

        <div className="form-row">
          <label>Location :</label>
          <select
            className="form-select"
            value={lokasi}
            onChange={(e) => setLokasi(e.target.value)}
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
          />
        </div>

        <div className="form-row">
          <label>
            Upload Photo : <br />
            <span style={{ fontSize: "10px", fontWeight: "400" }}>(upload if available)</span>
          </label>
          <label className="upload-box">
            <span>{foto ? "Foto terpilih ✓ (Klik untuk ganti)" : "⬆ Pilih Foto"}</span>
            <input type="file" accept="image/*" onChange={handleUploadFoto} hidden />
          </label>
        </div>

        <div className="form-actions-row">
          <button type="submit" className="btn-form-submit">
            Submit
          </button>
          <button type="button" onClick={handleReset} className="btn-form-reset">
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}

export default SubmitReportPage;