import React, { useState, useEffect } from "react";

function App() {
  const [page, setPage] = useState("login"); 
  const [user, setUser] = useState(null);

  // Жүйеге кірген қолданушыны localStorage-тен алу
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setPage("home"); // Егер қолданушы бар болса, бірден Home бетіне жібереді
    }
  }, []);

  return (
    <div>
      {page === "login" && <Login setUser={setUser} setPage={setPage} />}
      {page === "register" && <Register setPage={setPage} />}
      {page === "home" && user && <Home user={user} setUser={setUser} setPage={setPage} />}
    </div>
  );
}

function Login({ setUser, setPage }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (storedUser && storedUser.email === email && storedUser.password === password) {
      setUser(storedUser);
      setPage("home"); // Кіру сәтті болса, Home бетіне ауысу
    } else {
      alert("Қате email немесе пароль!");
    }
  };

  const handleGuestLogin = () => {
    const guestUser = { name: "Guest" };
    setUser(guestUser);
    setPage("home"); // Қонақ ретінде кіргенде басты бетке ауысу
  };

  return (
    <div>
      <h2>Кіру</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Құпия сөз" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Кіру</button>
      <button onClick={handleGuestLogin}>Қонақ ретінде кіру</button>
      <button onClick={() => setPage("register")}>Тіркелу</button>
    </div>
  );
}

function Register({ setPage }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = () => {
    if (!name || !email || !password) {
      alert("Барлық өрісті толтырыңыз!");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    alert("Тіркелу сәтті аяқталды!");
    setPage("login"); // Тіркелгеннен кейін Login бетіне ауысу
  };

  return (
    <div>
      <h2>Тіркелу</h2>
      <input type="text" placeholder="Атыңыз" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Құпия сөз" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleRegister}>Тіркелу</button>
      <button onClick={() => setPage("login")}>Кері</button>
    </div>
  );
}

function Home({ user, setUser, setPage }) {
  const handleLogout = () => {
    setUser(null);
    setPage("login"); // Шыққаннан кейін Login бетіне ауысу
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem("user");
    setUser(null);
    alert("Аккаунт жойылды!");
    setPage("register"); // Аккаунт жойылғаннан кейін қайта тіркелуге жібереді
  };

  return (
    <div>
      <h2>Сәлем, {user.name}!</h2>
      <button onClick={handleLogout}>Шығу</button>
      <button onClick={handleDeleteAccount}>Аккаунтты жою</button>
    </div>
  );
}

export default App;