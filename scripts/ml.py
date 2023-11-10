from scipy.optimize import linear_sum_assignment
from math import radians, sin, cos, sqrt, atan2
import numpy as np

# Sample list of cities with their coordinates (latitude, longitude)
cities = {
    "New York": (40.7128, -74.0060),
    "Los Angeles": (34.0522, -118.2437),
    "Chicago": (41.8781, -87.6298),
    "Houston": (29.7604, -95.3698),
    "Phoenix": (33.4484, -112.0740),
    "Philadelphia": (39.9526, -75.1652),
    "San Antonio": (29.4241, -98.4936),
    "San Diego": (32.7157, -117.1611),
}


# Function to calculate Haversine distance between two sets of coordinates
def haversine(lat1, lon1, lat2, lon2):
    R = 6371  # Radius of the Earth in kilometers
    lat1, lon1, lat2, lon2 = map(radians, [lat1, lon1, lat2, lon2])

    dlat = lat2 - lat1
    dlon = lon2 - lon1

    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c


# Calculate the number of cities
num_cities = len(cities)

# Create an empty distance matrix
distance_matrix = np.zeros((num_cities, num_cities))

# Calculate the Haversine distance between all pairs of cities
for i in range(num_cities):
    for j in range(i + 1, num_cities):
        distance_matrix[i, j] = haversine(
            cities[list(cities.keys())[i]][0],
            cities[list(cities.keys())[i]][1],
            cities[list(cities.keys())[j]][0],
            cities[list(cities.keys())[j]][1],
        )
        distance_matrix[j, i] = distance_matrix[i, j]

# Solve the TSP using the linear sum assignment algorithm
row_ind, col_ind = linear_sum_assignment(distance_matrix)

# Extract the optimal route based on the assignment
optimal_route = [list(cities.keys())[i] for i in col_ind]

# Print the optimal route
print("Optimal TSP Route:")
for city in optimal_route:
    print(city)

# Calculate the total distance of the optimal route
total_distance = distance_matrix[row_ind, col_ind].sum()
print("Total Distance:", total_distance)
