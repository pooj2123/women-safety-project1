import React from "react";

export default function RouteInfo({ routeData }) {
  return (
    <div
      style={{
        position: "absolute",
        bottom: 20,
        left: 20,
        zIndex: 1000,
        width: 280,
        padding: 18,
        borderRadius: 20,
        backdropFilter: "blur(14px)",
        background: "rgba(255,255,255,0.1)",
        border: "1px solid rgba(255,255,255,0.2)",
        color: "white",
      }}
    >
      <h3>Route Information</h3>

      <p>
        Distance:
        {" "}
        {routeData.shortest.distance_km} km
      </p>

      <p>
        Estimated Time:
        {" "}
        {routeData.shortest.time_min} mins
      </p>

      <p>
        Safety Score:
        {" "}
        🟢 {routeData.safety_score}%
      </p>
    </div>
  );
}