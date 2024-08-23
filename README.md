# Spending-Tracker

## NOTES


### User Schema
- uid: String
- email: String
- items: [type: String] <!-- Stores a list of the last 30 items that was input; values should be formatted as tuples (item, cost) -->
- savings: Number <!-- Stores the amount of savings -->
- spending: Number <!-- Stores the amount of spending money -->
- budget: Number <!-- Stores the previously used percentage the user selected to put into savings -->