import React from "react";

export default function RouteInfo({
  routeData,
  darkMode,
}) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 30,
        left: 25,
        zIndex: 1200,

        width: 320,

        padding: 20,

        borderRadius: 24,

        background: darkMode
          ? "rgba(20,20,20,0.72)"
          : "rgba(255,255,255,0.85)",

        backdropFilter: "blur(16px)",

        boxShadow:
          "0 4px 18px rgba(0,0,0,0.15)",

        color: darkMode ? "white" : "#111",
      }}
    >
      <h3
        style={{
          marginBottom: 14,
          fontSize: 20,
        }}
      >
        Route Information
      </h3>

      <p>
        <strong>Distance:</strong>{" "}
        {routeData.shortest.distance_km} km
      </p>

      <p>
        <strong>Estimated Time:</strong>{" "}
        {routeData.shortest.time_min} mins
      </p>

      <p>
        <strong>Safety Score:</strong>{" "}
        {routeData.safety_score}%
      </p>
    </div>
  );
}