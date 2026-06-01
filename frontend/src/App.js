import React, { useState } from "react";
import { MapContainer, TileLayer, Polyline, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";

import { searchLocation, getRoute } from "./services/api";

function App() {
  const [startInput, setStartInput] = useState("");
  const [endInput, setEndInput] = useState("");
  const [route, setRoute] = useState(null);

  const handleSearch = async () => {
    try {
      const start = await searchLocation(startInput);
      const end = await searchLocation(endInput);

      if (!start || !end) {
        alert("Invalid locations");
        return;
      }

      const routeData = await getRoute(start, end);

      if (routeData.error) {
        alert(routeData.error);
        return;
      }

      setRoute(routeData);
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    }
  };

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      
      {/* 🔍 Search Box */}
      <div
        style={{
          position: "absolute",
          top: "20px",
          left: "50%",
          transform: "translateX(-50%)",
          background: "white",
          padding: "15px",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          zIndex: 1000,
          width: "320px",
        }}
      >
        <input
          type="text"
          placeholder="Start location"
          value={startInput}
          onChange={(e) => setStartInput(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <input
          type="text"
          placeholder="Destination"
          value={endInput}
          onChange={(e) => setEndInput(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
        />

        <button
          onClick={handleSearch}
          style={{
            width: "100%",
            padding: "10px",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Search Route
        </button>
      </div>

      {/* 🗺️ Map */}
      <MapContainer
        center={[17.3606, 78.4741]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* 🛣️ Routes */}
        {route && (
          <>
            <Polyline
              positions={route.shortest.path}
              color="blue"
              weight={5}
            />
            <Polyline
              positions={route.safest.path}
              color="green"
              weight={5}
            />

            {/* 📍 Markers */}
            <Marker position={route.shortest.path[0]} />
            <Marker position={route.shortest.path[route.shortest.path.length - 1]} />
          </>
        )}
      </MapContainer>

      {/* 📊 Info Card */}
      {route && (
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "20px",
            background: "white",
            padding: "12px",
            borderRadius: "10px",
            boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
          }}
        >
          <h4>Route Info</h4>
          <p>📏 {route.shortest.distance_km.toFixed(2)} km</p>
          <p>⏱️ {route.shortest.time_min.toFixed(1)} mins</p>
        </div>
      )}
    </div>
  );
}

export default App;