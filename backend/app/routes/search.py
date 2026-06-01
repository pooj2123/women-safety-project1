from fastapi import APIRouter
import requests

router = APIRouter()

@router.get("/search")
def search_location(q: str):
    url = "https://nominatim.openstreetmap.org/search"

    params = {
        "q": q,
        "format": "json",
        "limit": 1
    }

    response = requests.get(url, params=params, headers={"User-Agent": "women-safety-app"})

    data = response.json()

    if not data:
        return {"error": "Location not found"}

    return {
        "lat": float(data[0]["lat"]),
        "lon": float(data[0]["lon"])
    }