import { useState, useEffect } from "react";
import { BrowserRouter, useNavigate, useParams, Navigate, Routes, Route, Link } from "react-router-dom";
import axios from "axios";
import "./App.css";

export default function App() {
  const [kirgen, setKirgen] = useState(false);
  const [kitaptar, setKitaptar] = useState([]);

  useEffect(() => {
    if (kirgen) {
      axios.get("https://67873274c4a42c916105d2fe.mockapi.io/api/onlineduken/books")
        .then(res => setKitaptar(res.data));
    }
  }, [kirgen]);

  return (
    <BrowserRouter>
      <div className="app-container">
        {kirgen && (
          <nav className="navbar">
            <div className="nav-container">
              <Link className="nav-link" to="/home">Basty bet</Link>
              <Link className="nav-link" to="/gallery">Kitaptar galeriyasy</Link>
              <div className="nav-title">Menin online kitaphanam</div>
            </div>
          </nav>
        )}

        <Routes>
          <Route path="/" element={kirgen ? <Navigate to="/home" /> : <KiruBeti onKiru={() => setKirgen(true)} />} />
          <Route path="/home" element={kirgen ? <BastyBet /> : <Navigate to="/" />} />
          <Route path="/gallery" element={kirgen ? <GalereyaBet kitaptar={kitaptar} /> : <Navigate to="/" />} />
          <Route path="/book/:id" element={kirgen ? <KitapTolygyrak kitaptar={kitaptar} /> : <Navigate to="/" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );

  function BastyBet() {
    return (
      <div className="Homepage">
        <div className="welcome-container">
          <h1 className="welcome-title">jeke kitaphanaga kosh keldin</h1>
          <p className="welcome-text">online kitaphanadan kerekti kitapinizdy tabasyz degen oidamyn</p>
          <div className="decoration-line"></div>
          <Link to="/gallery" className="explore-button"> Kitaptardy qarau </Link>
        </div>
      </div>
    );
  }

  function KiruBeti({ onKiru }) {
    const [email, setEmail] = useState("");
    const [kupiyaSoz, setKupiyaSoz] = useState("");
    const [qate, setQate] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
      e.preventDefault();
      const emailTekseru = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!emailTekseru) {
        setQate("Durys email engiz");
      } else if (kupiyaSoz.length < 4) {
        setQate("Kupiya soz kem degende 4 belgiden turu kerek");
      } else {
        onKiru();
        navigate("/home");
      }
    };

    return (
      <div className="login-container">
        <div className="login-card">
          <h2 className="login-title">Qaityp keldin!</h2>
          <p className="login-subtitle">Deretterdi engiz</p>

          <form className="login-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                placeholder="Email jaz"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Kupiya soz</label>
              <input
                id="password"
                type="password"
                placeholder="Kupiya soz jaz"
                value={kupiyaSoz}
                onChange={(e) => setKupiyaSoz(e.target.value)}
                className="form-input"
              />
            </div>

            {qate && <p className="error-message">{qate}</p>}

            <button type="submit" className="login-button">Kiru</button>
          </form>
        </div>
      </div>
    );
  }

  function GalereyaBet({ kitaptar }) {
    const navigate = useNavigate();
    return (
      <div className="gallery-container">
        <h2 className="gallery-title">Kitaptar koleksiyasy</h2>
        <p className="gallery-subtitle">Tolygyrak oku ushin kitapty bas</p>

        <div className="book-grid">
          {kitaptar.map((kitap) => (
            <div key={kitap.id} className="book-card" onClick={() => navigate(`/book/${kitap.id}`)}>
              <div className="book-image-container">
                <img src={kitap.image} alt={kitap.title} className="book-image" />
                <div className="book-overlay"></div>
              </div>
              <div className="book-info">
                <h3 className="book-title">{kitap.title}</h3>
                <p className="book-author">{kitap.author}</p>
                <button className="details-button">Tolygyrak</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  function KitapTolygyrak({ kitaptar }) {
    const { id } = useParams();
    const kitap = kitaptar.find((b) => b.id === id);

    if (!kitap) return (
      <div className="not-found">
        <h3>Kitap tabylmady</h3>
        <Link to="/gallery" className="back-link">Galeriyaga qaitu</Link>
      </div>
    );

    return (
      <div className="book-detail-container">
        <div className="book-detail-card">
          <div className="book-detail-image">
            <img src={kitap.image} alt={kitap.title} />
          </div>

          <div className="book-detail-content">
            <h2 className="book-detail-title">{kitap.title}</h2>
            <p className="book-detail-author">Avtory: {kitap.author}</p>

            <div className="book-detail-description">
              <h4>Sipattama</h4>
              <p>{kitap.description}</p>
            </div>

            <div className="book-meta">
              <div className="meta-item">
                <span className="meta-label">Zhanr:</span>
                <span className="meta-value">{kitap.genre || 'Korsetilmegen'}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">Bet san:</span>
                <span className="meta-value">{kitap.pages || 'Belgisiz'}</span>
              </div>
            </div>

            <Link to="/gallery" className="back-button">Galeriyaga qaitu</Link>
          </div>
        </div>
      </div>
    );
  }
}
