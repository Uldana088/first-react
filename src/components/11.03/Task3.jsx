import { useState } from "react";
export default function ThirdTask() {
  const [isDark, setIsDark] = useState(false);

  return (
    <div 
      style={{
        backgroundColor: isDark ? "black" : "white",
        color: isDark ? "white" : "black",
        height: "10vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <p>{isDark ? " карангы режим" : "жарк режим"}</p>
      <button onClick={() => setIsDark(!isDark)}>
        {isDark ? " жарык режимге ауыстыру" : "карангы режимге ауыстыру "}
      </button>
    </div>
  );
}