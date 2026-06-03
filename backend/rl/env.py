import numpy as np

class GraphEnv:
    def __init__(self, G):
        self.G = G
        self.current = None
        self.target = None
        self.visited = set()

    def reset(self, start, target):
        self.current = start
        self.target = target
        self.visited = {start}
        return self._get_state()

    def get_actions(self, node):
        neighbors = list(self.G.neighbors(node))

        # Prefer unvisited nodes
        unvisited = [
            n for n in neighbors
            if n not in self.visited
        ]

        return unvisited if unvisited else neighbors

    def step(self, action):
        next_node = action

        edge = self.G[self.current][next_node][0]

        distance = edge.get("length", 1)
        safety = edge.get("safety_score", 0.5)
        lighting = edge.get("lighting_score", 0.5)
        crowd = edge.get("crowd_score", 0.5)
        surveillance = edge.get("surveillance_score", 0.5)
        road_quality = edge.get("road_quality", 0.5)

        reward = self._calculate_reward(
            next_node,
            distance,
            safety,
            lighting,
            crowd,
            surveillance,
            road_quality
        )

        done = next_node == self.target

        self.current = next_node
        self.visited.add(next_node)

        return self._get_state(), reward, done

    def _calculate_reward(
        self,
        next_node,
        distance,
        safety,
        lighting,
        crowd,
        surveillance,
        road_quality
    ):
        reward = 0

        # ------------------
        # Base movement cost
        # ------------------
        reward -= 0.5

        # Distance penalty
        reward -= distance * 0.002

        # ------------------
        # Safety rewards
        # ------------------
        reward += safety * 20
        reward += lighting * 10
        reward += crowd * 8
        reward += surveillance * 12
        reward += road_quality * 6

        # ------------------
        # Coordinate data
        # ------------------
        current_y = self.G.nodes[self.current]["y"]
        current_x = self.G.nodes[self.current]["x"]

        next_y = self.G.nodes[next_node]["y"]
        next_x = self.G.nodes[next_node]["x"]

        target_y = self.G.nodes[self.target]["y"]
        target_x = self.G.nodes[self.target]["x"]

        # ------------------
        # Progress reward
        # ------------------
        current_dist = (
            (current_y - target_y) ** 2 +
            (current_x - target_x) ** 2
        )

        next_dist = (
            (next_y - target_y) ** 2 +
            (next_x - target_x) ** 2
        )

        if next_dist < current_dist:
            reward += 8
        else:
            reward -= 4

        # ------------------
        # Direction reward
        # ------------------
        goal_vec = np.array([
            target_y - current_y,
            target_x - current_x
        ])

        move_vec = np.array([
            next_y - current_y,
            next_x - current_x
        ])

        goal_norm = np.linalg.norm(goal_vec)
        move_norm = np.linalg.norm(move_vec)

        if goal_norm > 0 and move_norm > 0:
            cos_theta = np.dot(goal_vec, move_vec) / (
                goal_norm * move_norm
            )

            reward += 5 * cos_theta

        # ------------------
        # Loop penalty
        # ------------------
        if next_node in self.visited:
            reward -= 25
        else:
            reward += 1

        # ------------------
        # Destination reward
        # ------------------
        if next_node == self.target:
            reward += 1000

        return reward

    def _get_state(self):
        current_data = self.G.nodes[self.current]
        target_data = self.G.nodes[self.target]

        current_y = current_data["y"]
        current_x = current_data["x"]

        target_y = target_data["y"]
        target_x = target_data["x"]

        dy = target_y - current_y
        dx = target_x - current_x

        return np.array([
            current_y,
            current_x,
            target_y,
            target_x,
            dy,
            dx
        ], dtype=np.float32)