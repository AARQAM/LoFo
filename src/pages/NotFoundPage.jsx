function NotFoundPage({ pindahHalaman }) {
  return (
    <div style={{ textAlign: "center", padding: "40px 20px" }}>
      <h1 className="judul-halaman-gradasi" style={{ fontSize: "4rem", marginBottom: "4px" }}>
        404
      </h1>
      <p style={{ fontSize: "14px", color: "#4b5563", marginBottom: "20px" }}>
        Halaman yang Anda cari tidak ditemukan.
      </p>
      <button className="btn-contact" onClick={() => pindahHalaman("home")}>
        Kembali ke Beranda
      </button>
    </div>
  );
}

export default NotFoundPage;