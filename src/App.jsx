import { useState, useEffect } from "react";
import { BrowserRouter, useNavigate, useParams ,  Navigate, Routes, Route, Link,  } from "react-router-dom";
import axios from "axios";
import "./App.css";

export default function App() {
  const[login , setLogin] = useState(false);
  const [book , setBook] = useState([]);

  useEffect(() => {
    if (login) {
      axios.get("https://67873274c4a42c916105d2fe.mockapi.io/api/onlineduken/books")
        .then(respon => setBook(respon.data));
    }
  }, [login])

  return (
    <BrowserRouter>
        {login && (
        <nav className="navbar">
          <Link className="nav-link" to="/home">Home</Link>
          <Link className="nav-link" to="/gallery">Book Gallery</Link>
        </nav>
      )}

      <Routes>
        <Route path="/" element={login ? <Navigate to="/home" /> : <LoginPage onLogin={() => setLogin(true)} />} />
        <Route path="/home" element={login ? <HomePage /> : <Navigate to="/" />} />
        <Route path="/gallery" element={login ? <GalleryPage books={book} /> : <Navigate to="/" />} />
        <Route path="/book/:id" element={login ? <Kitaptolygyraq books={book} /> : <Navigate to="/" />} />
      </Routes>

    </BrowserRouter>
  )

  
function HomePage() {
  return (
    <div className="homePage">
      <h1>Welcome to Libraryy!</h1>
    </div>
  );
}

function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const emailTeksery = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailTeksery) {
      setError("qate, email durys emes @ boly kerek");
    } else if (password.length < 4) {
      setError("Qate, parol 4 ten az bolmaui kerek");
    } else {
      onLogin();
      navigate("/home");
    }
  }

  return (
    <div className="loginPage">
      <form className="loginForm" onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Parol"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit">Kiru</button>
      </form>
    </div>
  );
}

function GalleryPage({ books }) {
  const navigate = useNavigate();
  return (
    <div className="libraryPage bookGrid">
      {books.map((book) => (
        <div key={book.id} className="bookCard" onClick={() => navigate(`/book/${book.id}`)}>
          <img src={book.image}  />
          <h2>{book.title}</h2>
          <button>Tolygyraq kory</button>
        </div>
      ))}
    </div>
  )
}

function Kitaptolygyraq({ books }) {
  const { id } = useParams();
  const book = books.find((b) => b.id === id);

  if (!book) return <div className="homePage"><h3>kitap tabylmady</h3></div>;

  return (
    <div className="bookDetail">
      <img src={book.image} alt={book.title} />
      <div className="bookInfo">
        <h2>{book.title}</h2>
        <p>{book.description}</p>
        <strong>Author: {book.author}</strong>
      </div>
    </div>
  );
}
}
