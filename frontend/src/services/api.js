const BASE_URL = "http://127.0.0.1:8000";

export const searchLocation = async (query) => {
  try {
    const res = await fetch(`${BASE_URL}/search?q=${query}`);
    const data = await res.json();

    if (data.error) return null;

    return {
      lat: data.lat,
      lon: data.lon,
    };
  } catch (err) {
    console.error("Search error:", err);
    return null;
  }
};

export const getRoute = async (start, end) => {
  try {
    const res = await fetch(`${BASE_URL}/route`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        start_lat: start.lat,
        start_lon: start.lon,
        end_lat: end.lat,
        end_lon: end.lon,
      }),
    });

    return await res.json();
  } catch (err) {
    console.error("Route error:", err);
    return null;
  }
};