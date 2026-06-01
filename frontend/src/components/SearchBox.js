import React, { useState } from "react";

export default function SearchBox({ darkMode }) {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  return (
    <div
      style={{
        position: "absolute",
        top: 25,
        left: 25,
        zIndex: 1000,

        width: 370,
        padding: 28,

        borderRadius: "30px",

        background: darkMode
          ? "rgba(15,15,20,0.58)"
          : "rgba(235,240,255,0.55)",

        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",

        border: darkMode
          ? "1px solid rgba(255,255,255,0.12)"
          : "1px solid rgba(0,0,0,0.08)",

        boxShadow:
          "0 8px 32px rgba(0,0,0,0.22)",

        overflow: "hidden",
      }}
    >
      <h2
        style={{
          color: darkMode ? "#ffffff" : "#111111",

          marginBottom: 20,

          fontSize: "24px",

          fontWeight: "700",

          letterSpacing: "0.3px",
        }}
      >
        Women Safety Navigation
      </h2>

      {/* START INPUT */}
      <input
        type="text"
        placeholder="Start location"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        style={{
          ...inputStyle,

          color: darkMode ? "#ffffff" : "#111111",

          background: darkMode
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0.78)",

          border: darkMode
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(0,0,0,0.08)",
        }}
      />

      {/* DESTINATION INPUT */}
      <input
        type="text"
        placeholder="Destination"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        style={{
          ...inputStyle,

          color: darkMode ? "#ffffff" : "#111111",

          background: darkMode
            ? "rgba(255,255,255,0.08)"
            : "rgba(255,255,255,0.78)",

          border: darkMode
            ? "1px solid rgba(255,255,255,0.08)"
            : "1px solid rgba(0,0,0,0.08)",
        }}
      />

      <button style={buttonStyle}>
        Find Safe Route
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",

  padding: "15px 18px",

  marginBottom: "16px",

  borderRadius: "16px",

  outline: "none",

  fontSize: "15px",

  boxSizing: "border-box",

  backdropFilter: "blur(12px)",

  transition: "0.25s ease",
};

const buttonStyle = {
  width: "100%",

  padding: "15px",

  borderRadius: "16px",

  border: "none",

  background:
    "linear-gradient(135deg, #00c896, #00ffcc)",

  color: "#111",

  fontWeight: "700",

  cursor: "pointer",

  fontSize: "15px",

  boxShadow:
    "0 4px 18px rgba(0,255,200,0.28)",

  transition: "0.25s ease",
};