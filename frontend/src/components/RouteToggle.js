import React from "react";

export default function RouteToggle({
  routeType,
  setRouteType,
  darkMode,
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 25,
        right: 20,
        zIndex: 1200,

        display: "flex",
        gap: 10,

        padding: 10,

        borderRadius: 18,

        background: darkMode
          ? "rgba(20,20,20,0.7)"
          : "rgba(255,255,255,0.85)",

        backdropFilter: "blur(14px)",

        boxShadow:
          "0 4px 18px rgba(0,0,0,0.15)",
      }}
    >
      <button
        onClick={() => setRouteType("shortest")}
        style={{
          padding: "10px 16px",

          borderRadius: 12,

          border: "none",

          cursor: "pointer",

          background:
            routeType === "shortest"
              ? "#0066ff"
              : "transparent",

          color:
            routeType === "shortest"
              ? "white"
              : darkMode
              ? "white"
              : "#111",

          fontWeight: "600",
        }}
      >
        Shortest
      </button>

      <button
        onClick={() => setRouteType("safest")}
        style={{
          padding: "10px 16px",

          borderRadius: 12,

          border: "none",

          cursor: "pointer",

          background:
            routeType === "safest"
              ? "#00c896"
              : "transparent",

          color:
            routeType === "safest"
              ? "#111"
              : darkMode
              ? "white"
              : "#111",

          fontWeight: "600",
        }}
      >
        Safest
      </button>
    </div>
  );
}