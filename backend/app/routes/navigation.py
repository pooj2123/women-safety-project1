from fastapi import APIRouter
from app.services.routing import shortest_path, safest_path, G

router = APIRouter()

# -----------------------------
# Helper: Find nearest node
# -----------------------------
def get_nearest_node(lat, lon):
    closest_node = None
    min_dist = float("inf")

    for node, data in G.nodes(data=True):
        node_lat = data.get("y")
        node_lon = data.get("x")

        if node_lat is None or node_lon is None:
            continue

        dist = (lat - node_lat) ** 2 + (lon - node_lon) ** 2

        if dist < min_dist:
            min_dist = dist
            closest_node = node

    return closest_node


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
# API Endpoint (THIS IS /route)
# -----------------------------
@router.post("/route")
def get_route(data: dict):
    try:
        start_lat = data["start_lat"]
        start_lon = data["start_lon"]
        end_lat = data["end_lat"]
        end_lon = data["end_lon"]
        if not all(k in data for k in ["start_lat", "start_lon", "end_lat", "end_lon"]):
            return {"error": "Missing input"}
        print(f"Start: {start_lat},{start_lon} → End: {end_lat},{end_lon}")
        print(f"Distance: {dist}")

        # Convert lat/lon → nearest graph nodes
        source = get_nearest_node(start_lat, start_lon)
        target = get_nearest_node(end_lat, end_lon)

        if source is None or target is None:
            return {"error": "Invalid location"}

        # Compute paths
        sp = shortest_path(source, target)
        safe = safest_path(source, target)

        if not sp or not safe:
            return {"error": "No route found"}

        # Distance + time
        dist = calculate_distance(G, sp)
        time = dist / 1.4  # walking speed (m/s)

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
        print("ERROR in /route:", e)