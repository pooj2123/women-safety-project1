import L from "leaflet";

export const destinationIcon = new L.Icon({
  iconUrl:
    "https://cdn-icons-png.flaticon.com/512/2776/2776067.png",

  iconSize: [38, 38],
  iconAnchor: [19, 38],
});

export const darkStartStyle = {
  radius: 10,
  color: "#00ffcc",
  fillColor: "#00ffcc",
  fillOpacity: 0.95,
  weight: 3,
};

export const lightStartStyle = {
  radius: 10,
  color: "#0066ff",
  fillColor: "#0066ff",
  fillOpacity: 0.95,
  weight: 3,
};