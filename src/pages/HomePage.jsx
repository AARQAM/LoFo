function HomePage({ pindahHalaman }) {
  return (
    <div className="lofo-container">
      <section className="hero-section">
        {/* Blok Teks Kiri */}
        <div>
          <h1 className="hero-title">
            Find & <br />
            Recover <br />
            <span className="text-gradasi-hijau">With Ease</span>
          </h1>
          <p className="hero-subtitle">
            Experience effortless recovery with our dedicated lost and found service.
          </p>
        </div>

        {/* Blok Tombol Kanan */}
        <div className="hero-actions">
          <button className="btn-lost" onClick={() => pindahHalaman("lost")}>
            Lost
          </button>
          <button className="btn-found" onClick={() => pindahHalaman("found")}>
            Found
          </button>
        </div>
      </section>
    </div>
  );
}

export default HomePage;