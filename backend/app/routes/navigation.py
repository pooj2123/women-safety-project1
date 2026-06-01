from fastapi import APIRouter
from app.services.routing import shortest_path, safest_path, G
import osmnx as ox

router = APIRouter()

# -----------------------------
# ✅ Correct nearest node (FIXED)
# -----------------------------
def get_nearest_node(lat, lon):
    try:
        return ox.distance.nearest_nodes(G, lon, lat)
    except Exception as e:
        print("Nearest node error:", e)
        return None


# -----------------------------
# Helper: Calculate distance
# -----------------------------
def calculate_distance(G, path):
    total = 0
    for i in range(len(path) - 1):
        edge = G[path[i]][path[i + 1]][0]
        total += edge.get("length", 0)
    return total


# -----------------------------
# Helper: Convert nodes → coords
# -----------------------------
def nodes_to_coords(path):
    coords = []
    for node in path:
        data = G.nodes[node]
        coords.append([data["y"], data["x"]])  # lat, lon
    return coords


# -----------------------------
# API Endpoint
# -----------------------------
@router.post("/route")
def get_route(data: dict):
    try:
        start_lat = data["start_lat"]
        start_lon = data["start_lon"]
        end_lat = data["end_lat"]
        end_lon = data["end_lon"]

        source = get_nearest_node(start_lat, start_lon)
        target = get_nearest_node(end_lat, end_lon)

        if source is None or target is None:
            return {"error": "Invalid location"}

        sp = shortest_path(source, target)
        safe = safest_path(source, target)

        dist = calculate_distance(G, sp)
        time = dist / 1.4
        
        return {
        "shortest": {
            "path": nodes_to_coords(sp),
            "distance_km": dist / 1000,
            "time_min": time / 60
        },
        "safest": {
            "path": nodes_to_coords(safe)
        }
    }
        

    except Exception as e:
        print("ERROR:", e)
        return {"error": "Something went wrong"}