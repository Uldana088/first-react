import { useEffect, useState } from "react";
import "./App.css"

function App() {
  const [bet, funcBet] = useState("login");
  const [user, funcUser] = useState(null);

  useEffect(() => {
    const localUser = localStorage.getItem("user");
    if (localUser) {
      funcUser(JSON.parse(localUser));
      funcBet("home");
    }
  }, []);

  return (
    <div>
      {bet === "login" && <Login funcUser={funcUser} funcBet={funcBet} />}
      {bet === "register" && <Register funcBet={funcBet} />}
      {bet === "home" && <Home user={user} funcUser={funcUser} funcBet={funcBet} />}
    </div>
  );
}

function Login({ funcUser, funcBet }) {
  const [email, funcEmail] = useState("");
  const [password, funcPassword] = useState("");

  const LoginFunc = () => {
    const localUser = JSON.parse(localStorage.getItem("user"));

    if (localUser && localUser.email === email && localUser.password === password) {
      funcUser(localUser);
      funcBet("home");
    } else {
      alert("Qate email or password");
    }
  };

  const LoginQonaq = () => {
    const QonaqUser = { name: "Qonaq" };
    funcUser(QonaqUser);
    funcBet("home");
  };

  return (
    <div className="firstDiv" >
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={(e) => funcEmail(e.target.value)} />
      <input type="password" placeholder="password" value={password} onChange={(e) => funcPassword(e.target.value)} />
      <button onClick={LoginFunc}>Login</button>
      <button onClick={LoginQonaq}>Qonaq bolp kiry</button>
      <button onClick={() => funcBet("register")}>Sign in</button>
    </div>
  );
}

function Register({ funcBet }) {
  const [name, funcName] = useState("");
  const [email, funcEmail] = useState("");
  const [password, funcPassword] = useState("");

  const localRegister = () => {
    if (!name || !email || !password) {
      alert("Tolyrynyz");
      return;
    }

    localStorage.setItem("user", JSON.stringify({ name, email, password }));
    alert("Tirkelyndy");
    funcBet("login");
  };

  return (
    <div>
      <h2>Register</h2>
      <input type="text" placeholder="Your name" value={name} onChange={(e) => funcName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => funcEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => funcPassword(e.target.value)} />
      <button onClick={localRegister}>Register</button>
      <button onClick={() => funcBet("login")}>Artka</button>
    </div>
  );
}

function Home({ user, funcUser, funcBet }) {
  const handleLogout = () => {
    funcUser(null);
    funcBet("login");
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem("user");
    funcUser(null);
    alert("Account oshdi");
    funcBet("register");
  };

  return (
    <div>
      <h2>Salem, {user?.name}</h2>
      <button onClick={handleLogout}>Exit</button>
      <button onClick={handleDeleteAccount}>Delete account</button>
    </div>
  );
}

export default App;

