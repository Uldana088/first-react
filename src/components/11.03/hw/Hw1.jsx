import { useState, useEffect } from "react";


//task1

// export default function Select() {
//   const [color, setColor] = useState(localStorage.getItem("color") || "white");

//   useEffect(() => {
//     const save = localStorage.getItem("color");
//     if (save) {
//       setColor(save);
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("color", color);
//   }, [color]);

//   return (
//     <div style={{ backgroundColor: color, height: "100vh" }}>
//       <h2>select color:</h2>
//       <button onClick={() => setColor("red")}> red</button>
//       <button onClick={() => setColor("blue")}>bluee</button>
//       <button onClick={() => setColor("green")}> green</button>
//     </div>
//   );
// }



//task2

// export default function Login() {
//   const [username, setUsername] = useState(localStorage.getItem("username") || "");

//   useEffect(() => {
//     const user = localStorage.getItem("username");
//     if (user) {
//       setUsername(user);
//     }
//   }, []);

//   useEffect(() => {
//     if (username) {
//       localStorage.setItem("username", username);
//     } else {
//       localStorage.removeItem("username");
//     }
//   }, [username]);

//   return (
//     <div>
//       <h2>{username ? `hellooo, ${username}!` : "sign in"}</h2>
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder=" your name....."
//       />
//       <button onClick={() => setUsername("")}> exit</button>
//     </div>
//   );
// }


//TASK3 

// export default function dybysDengeyi() {
//   const [volume, setVolume] = useState(Number(localStorage.getItem("volume")) || 50);

//   useEffect(() => {
//     const dybysSaqtau = localStorage.getItem("volume");
//     if (dybysSaqtau) {
//       setVolume(Number(dybysSaqtau));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem("volume", volume);
//   }, [volume]);

//   return (
//     <div>
//       <h2> dybys dengeyi {volume}</h2>
//       <input
//         type="range"
//         min="0"
//         max="100"
//         value={volume}
//         onChange={(e) => setVolume(Number(e.target.value))}
//       />
//     </div>
//   );
// }

// //TASK4 
// export default function Timer() {
//   const [seconds, second] = useState(Number(localStorage.getItem("seconds")) || 0);

//   useEffect(() => {
//     const savedTime = localStorage.getItem("seconds");
//     if (savedTime) {
//       second(Number(savedTime));
//     }
//   }, []); 

//   useEffect(() => {
//     const interval = setInterval(() => {
//       second((num) => {
//         const newTime = num + 1;
//         localStorage.setItem("seconds", newTime);
//         return newTime;
//       });
//     }, 1000);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div>
//       <h2>time: {seconds} second</h2>
//     </div>
//   );
// }

//TASK5
export default function CurrencyConverter() {
  const [currency, setCurrency] = useState(localStorage.getItem("currency") || "USD");

  useEffect(() => {
    const savedCurrency = localStorage.getItem("currency");
    if (savedCurrency) {
      setCurrency(savedCurrency);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("currency", currency);
  }, [currency]);

  return (
    <div>
      <h2>Таңдалған валюта: {currency}</h2>
      <button onClick={() => setCurrency("USD")}>USD</button>
      <button onClick={() => setCurrency("EUR")}>EUR</button>
      <button onClick={() => setCurrency("KZT")}> KZT</button>
    </div>
  );
}

