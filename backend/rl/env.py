class GraphEnv:
    def __init__(self, G):
        self.G = G
        self.current = None
        self.target = None

    def reset(self, start, target):
        self.current = start
        self.target = target
        return self._get_state()

    def get_actions(self, node):
        return list(self.G.neighbors(node))

    def step(self, action):
        next_node = action

        edge = self.G[self.current][next_node][0]
        dist = edge.get("length", 1)

        reward = -dist
        done = next_node == self.target

        self.current = next_node

        return self._get_state(), reward, done

    def _get_state(self):
        current_data = self.G.nodes[self.current]
        target_data = self.G.nodes[self.target]

        return [
            current_data["y"],
            current_data["x"],
            target_data["y"],
            target_data["x"]
        ]
    
if __name__ == "__main__":
    import pickle

    with open("C:\\Users\\ppooj\\OneDrive\\Desktop\\WomenSafety\\backend\\app\\data\\graph_with_safety.pkl", "rb") as f:
        G = pickle.load(f)

    nodes = list(G.nodes)

    env = GraphEnv(G)
    state = env.reset(nodes[0], nodes[10])
    print("STATE:", state)

    actions = env.get_actions(env.current)
    print("Actions:", actions[:5])