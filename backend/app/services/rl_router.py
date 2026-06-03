import torch
import pickle
import numpy as np
import networkx as nx

from rl.dqn import DQN

print("USING RL ROUTER FILE:", __file__)

class RLRouter:
    def __init__(self):
        with open("app/data/processed_graph.pkl", "rb") as f:
            self.G = pickle.load(f)

        self.model = DQN(input_dim=6, output_dim=10)

        self.model.load_state_dict(
            torch.load(
                "app/rl/dqn_model.pth",
                map_location="cpu"
            )
        )

        self.model.eval()

    def build_state(self, current, target):
        c = self.G.nodes[current]
        t = self.G.nodes[target]

        dy = t["y"] - c["y"]
        dx = t["x"] - c["x"]

        return np.array([
            c["y"],
            c["x"],
            t["y"],
            t["x"],
            dy,
            dx
        ], dtype=np.float32)


    def choose_next(self, current, target, visited):

        neighbors = [
            n for n in self.G.neighbors(current)
            if n not in visited
        ]

        if not neighbors:
            return None

        state = torch.FloatTensor(
            self.build_state(current, target)
        )

        with torch.no_grad():
            q_values = self.model(state)[0]

        valid_q = q_values[:len(neighbors)]

        best_idx = torch.argmax(valid_q).item()

        return neighbors[best_idx]


    def generate_route(
        self,
        start,
        target,
        max_steps=500
    ):
        print("=== NEW RL ROUTER LOADED ===")

        route = [start]
        current = start

        visited = {start}

        for _ in range(max_steps):

            if current == target:
                print("Destination reached by RL")
                return route

            nxt = self.choose_next(
                current,
                target,
                visited
            )

            if nxt is None:
                break

            route.append(nxt)

            visited.add(nxt)
            current = nxt

        print("RL failed before destination")
        print("Current node:", current)
        print("Target node:", target)

        try:
            print("ENTERING FALLBACK")

            remaining = nx.shortest_path(
                self.G,
                current,
                target,
                weight="length"
            )

            if len(remaining) > 1:
                route.extend(remaining[1:])

        except Exception as e:
            print("FALLBACK ERROR:", str(e))

        return route