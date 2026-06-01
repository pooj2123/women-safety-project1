import os
import pickle

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

GRAPH_PATH = os.path.join(BASE_DIR, "data", "graph_with_safety.pkl")

print("Loading graph from:", GRAPH_PATH)

with open(GRAPH_PATH, "rb") as f:
    G = pickle.load(f)

print(f"Graph loaded: {len(G.nodes)} nodes")

# ✅ no G parameter
def shortest_path(source, target):
    return nx.shortest_path(G, source, target, weight='length')


def safest_path(source, target):

    def cost(u, v, data):
        distance = data.get('length', 1)
        safety = data.get('safety_score', 0.5)
        return distance + (1 - safety) * 100

    return nx.shortest_path(G, source, target, weight=cost)