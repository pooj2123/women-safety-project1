import React, { useState, useEffect } from "react";

import {
  MapContainer,
  TileLayer,
  Polyline,
  Marker,
  Popup,
  CircleMarker,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import "../styles/map.css";

import SearchBox from "./SearchBox";
import RouteToggle from "./RouteToggle";
import RouteInfo from "./RouteInfo";
import LoadingOverlay from "./LoadingOverlay";

import {
  destinationIcon,
  darkStartStyle,
  lightStartStyle,
} from "./icons";

const center = [17.385, 78.4867];

// -----------------------------
// AUTO FIT ROUTE
// -----------------------------
function FitBounds({ path }) {
  const map = useMap();

  useEffect(() => {
    if (path && path.length > 0) {
      map.fitBounds(path, {
        padding: [50, 50],
      });
    }
  }, [path, map]);

  return null;
}

// -----------------------------
// FLY TO CURRENT LOCATION
// -----------------------------
function FlyToLocation({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(position, 15, {
        duration: 2,
      });
    }
  }, [position, map]);

  return null;
}

export default function MapView() {
  const [routeType, setRouteType] =
    useState("safest");

  const [loading, setLoading] =
    useState(false);

  const [darkMode, setDarkMode] =
    useState(true);

  const [start, setStart] =
    useState(center);

  const [destination, setDestination] =
    useState([17.398, 78.495]);

  const [routeData, setRouteData] =
    useState({
      shortest: {
        path: [
          [17.385, 78.4867],
          [17.39, 78.49],
          [17.398, 78.495],
        ],

        distance_km: 5.2,
        time_min: 12,
      },

      safest: {
        path: [
          [17.385, 78.4867],
          [17.387, 78.482],
          [17.392, 78.478],
          [17.398, 78.495],
        ],
      },

      safety_score: 82,
    });

  const shortestPath =
    routeData?.shortest?.path || [];

  const safestPath =
    routeData?.safest?.path || [];

  const activePath =
    routeType === "shortest"
      ? shortestPath
      : safestPath;

  // -----------------------------
  // CURRENT LOCATION
  // -----------------------------
  const useCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat =
          position.coords.latitude;

        const lon =
          position.coords.longitude;

        setStart([lat, lon]);
      },

      (err) => {
        console.log(err);

        alert("Location access denied");
      }
    );
  };

  // -----------------------------
  // CLEAR ROUTE
  // -----------------------------
  const clearRoute = () => {
    setRouteData({
      shortest: {
        path: [],
        distance_km: 0,
        time_min: 0,
      },

      safest: {
        path: [],
      },

      safety_score: 0,
    });

    setDestination(null);
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {loading && <LoadingOverlay />}

      <SearchBox
        setLoading={setLoading}
        darkMode={darkMode}
        setRouteData={setRouteData}
        setStart={setStart}
        setDestination={setDestination}
      />

      <RouteToggle
        routeType={routeType}
        setRouteType={setRouteType}
        darkMode={darkMode}
      />

      <RouteInfo
        routeData={routeData}
        darkMode={darkMode}
      />

      {/* SAFETY SCORE */}
      <div
        style={{
          position: "absolute",
          top: 20,
          right: 20,
          zIndex: 1200,

          padding: "14px 18px",

          borderRadius: "16px",

          background: darkMode
            ? "rgba(20,20,20,0.85)"
            : "rgba(255,255,255,0.92)",

          color: darkMode
            ? "#fff"
            : "#111",

          backdropFilter: "blur(12px)",

          boxShadow:
            "0 4px 18px rgba(0,0,0,0.25)",

          fontWeight: "bold",

          fontSize: "18px",
        }}
      >
        🛡️ Safety Score:{" "}
        {routeData?.safety_score || 0}%
      </div>

      {/* THEME TOGGLE */}
      <button
        onClick={() =>
          setDarkMode(!darkMode)
        }
        style={{
          position: "absolute",
          top: 90,
          right: 20,
          zIndex: 1200,

          padding: "10px 16px",

          borderRadius: "14px",
          border: "none",

          cursor: "pointer",

          background: darkMode
            ? "rgba(20,20,20,0.85)"
            : "rgba(255,255,255,0.9)",

          color: darkMode
            ? "#fff"
            : "#111",

          backdropFilter: "blur(10px)",

          boxShadow:
            "0 4px 18px rgba(0,0,0,0.25)",

          fontWeight: "bold",
        }}
      >
        {darkMode
          ? "☀️ Light"
          : "🌙 Dark"}
      </button>

      {/* CURRENT LOCATION BUTTON */}
      <button
        onClick={useCurrentLocation}
        style={{
          position: "absolute",
          top: 150,
          right: 20,
          zIndex: 1200,

          padding: "10px 16px",

          borderRadius: "14px",
          border: "none",

          cursor: "pointer",

          background: darkMode
            ? "rgba(20,20,20,0.85)"
            : "rgba(255,255,255,0.9)",

          color: darkMode
            ? "#fff"
            : "#111",

          backdropFilter: "blur(10px)",

          boxShadow:
            "0 4px 18px rgba(0,0,0,0.25)",

          fontWeight: "bold",
        }}
      >
        📍 My Location
      </button>

      {/* CLEAR ROUTE BUTTON */}
      <button
        onClick={clearRoute}
        style={{
          position: "absolute",
          top: 210,
          right: 20,
          zIndex: 1200,

          padding: "10px 16px",

          borderRadius: "14px",
          border: "none",

          cursor: "pointer",

          background: "#ff4d4f",

          color: "#fff",

          backdropFilter: "blur(10px)",

          boxShadow:
            "0 4px 18px rgba(0,0,0,0.25)",

          fontWeight: "bold",
        }}
      >
        ❌ Clear Route
      </button>

      <MapContainer
        center={center}
        zoom={13}
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        {/* AUTO FIT ROUTE */}
        <FitBounds path={activePath} />

        {/* FLY TO CURRENT LOCATION */}
        <FlyToLocation position={start} />

        {/* MAP THEME */}
        <TileLayer
          attribution='&copy; OpenStreetMap contributors'
          url={
            darkMode
              ? "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
        />

        {/* START DOT */}
        {start && (
          <CircleMarker
            center={start}
            pathOptions={
              darkMode
                ? darkStartStyle
                : lightStartStyle
            }
          >
            <Popup>Start Location</Popup>
          </CircleMarker>
        )}

        {/* DESTINATION MARKER */}
        {destination && (
          <Marker
            position={destination}
            icon={destinationIcon}
          >
            <Popup>
              Destination
            </Popup>
          </Marker>
        )}

        {/* SHORTEST ROUTE */}
        {routeType === "shortest" &&
          shortestPath.length > 0 && (
            <Polyline
              positions={shortestPath}
              pathOptions={{
                color: darkMode
                  ? "#00ff99"
                  : "#0066ff",

                weight: 6,
                opacity: 0.95,
              }}
            />
          )}

        {/* SAFEST ROUTE */}
        {routeType === "safest" &&
          safestPath.length > 0 && (
            <Polyline
              positions={safestPath}
              pathOptions={{
                color: darkMode
                  ? "#00ff99"
                  : "#0055ff",

                weight: 7,
                opacity: 1,
              }}
            />
          )}
      </MapContainer>
    </div>
  );
}