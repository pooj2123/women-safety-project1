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
        left: 20,

        zIndex: 1200,

        width: "320px",

        padding: "18px",

        borderRadius: "20px",

        background: darkMode
          ? "rgba(20,20,20,0.85)"
          : "rgba(255,255,255,0.92)",

        color: darkMode
          ? "#fff"
          : "#111",

        backdropFilter: "blur(14px)",

        boxShadow:
          "0 8px 30px rgba(0,0,0,0.25)",
      }}
    >

      <h2
        style={{
          marginTop: 0,
          marginBottom: "16px",

          fontSize: "20px",
        }}
      >
        📊 Route Analytics
      </h2>

      {/* DISTANCE */}
      <div
        style={{
          marginBottom: "12px",
        }}
      >
        <strong>Distance:</strong>
        {" "}
        {routeData?.shortest?.distance_km || 0}
        {" "}km
      </div>

      {/* ETA */}
      <div
        style={{
          marginBottom: "12px",
        }}
      >
        <strong>Estimated Time:</strong>
        {" "}
        {routeData?.shortest?.time_min || 0}
        {" "}min
      </div>

      {/* SAFETY */}
      <div
        style={{
          marginBottom: "12px",
        }}
      >
        <strong>Safety Score:</strong>
        {" "}
        {routeData?.safety_score || 0}%
      </div>

      {/* STATUS */}
      <div
        style={{
          marginTop: "18px",

          padding: "10px",

          borderRadius: "12px",

          background:
            "rgba(0,255,170,0.12)",

          fontWeight: "bold",

          textAlign: "center",
        }}
      >
        ✅ RL Routing Active
      </div>

    </div>
  );
}