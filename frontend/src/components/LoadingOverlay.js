import React from "react";

export default function LoadingOverlay() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: "rgba(0,0,0,0.45)",
        zIndex: 2000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: "white",
        fontSize: "22px",
        fontWeight: "bold",
      }}
    >
      Finding safest route...
    </div>
  );
}