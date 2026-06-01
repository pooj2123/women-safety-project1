import React from "react";

export default function RouteToggle({
  routeType,
  setRouteType,
}) {
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 1000,
        display: "flex",
        gap: 10,
      }}
    >
      <button
        onClick={() => setRouteType("shortest")}
        style={{
          ...buttonStyle,
          background:
            routeType === "shortest"
              ? "#4da3ff"
              : "#1f1f1f",
        }}
      >
        Shortest
      </button>

      <button
        onClick={() => setRouteType("safest")}
        style={{
          ...buttonStyle,
          background:
            routeType === "safest"
              ? "#00c896"
              : "#1f1f1f",
        }}
      >
        Safest
      </button>
    </div>
  );
}

const buttonStyle = {
  padding: "10px 18px",
  borderRadius: "12px",
  border: "none",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};