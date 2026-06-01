import React, { useState } from "react";

export default function SearchBox() {
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  return (
    <div
  style={{
    position: "absolute",
    top: 25,
    left: 25,
    zIndex: 1000,
    width: 340,
    padding: 24,

    background: "rgba(17, 25, 40, 0.45)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",

    borderRadius: "24px",

    border: "1px solid rgba(255,255,255,0.18)",

    boxShadow:
      "0 8px 32px rgba(0,0,0,0.37)",

    color: "white",
  }}
>
      <h2
        style={{
          color: "white",
          marginBottom: 15,
        }}
      >
        Women Safety Navigation
      </h2>

      <input
        type="text"
        placeholder="Start location"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        style={inputStyle}
      />

      <input
        type="text"
        placeholder="Destination"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        style={inputStyle}
      />

      <button style={buttonStyle}>
        Find Safe Route
      </button>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "12px",
  borderRadius: "12px",
  border: "none",
  outline: "none",
  fontSize: "14px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "12px",
  border: "none",
  background: "#00c896",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};