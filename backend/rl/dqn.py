import torch
import torch.nn as nn


class DQN(nn.Module):
    def __init__(self, input_dim=6, output_dim=10):
        """
        input_dim = 4
        [current_lat, current_lon, target_lat, target_lon]

        output_dim = 10
        Max possible action slots considered by model
        """
        super(DQN, self).__init__()

        self.network = nn.Sequential(
            nn.Linear(input_dim, 128),
            nn.ReLU(),

            nn.Linear(128, 256),
            nn.ReLU(),

            nn.Linear(256, 128),
            nn.ReLU(),

            nn.Linear(128, output_dim)
        )

    def forward(self, x):
        """
        Forward pass
        """
        if len(x.shape) == 1:
            x = x.unsqueeze(0)

        return self.network(x)


if __name__ == "__main__":
    # Quick test

    model = DQN()

    sample_state = torch.FloatTensor([
        17.3822014,   # current lat
        78.4933794,   # current lon
        17.4287668,   # target lat
        78.4554611,    # target lon
        17.4287668 - 17.3822014,   # dy
        78.4554611 - 78.4933794    # dx
    ])

    output = model(sample_state)

    print("Q-values:")
    print(output)
    print("Output shape:", output.shape)