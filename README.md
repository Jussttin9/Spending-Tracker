# Spending-Tracker

## NOTES


### User Schema
- uid: String
- email: String
- items: [type: String] <!-- Stores a list of the last 30 items that was input; values should be formatted as tuples (item, cost) -->
- savings: Number <!-- Stores the amount of savings -->
- spending: Number <!-- Stores the amount of spending money -->
- budget: Number <!-- Stores the previously used percentage the user selected to put into savings -->

### Features to Add
- Receipt for spending should store only things bought during a 1-week period and should reset every week (can calculate average amount spend per week)
- Receipt for savings should store the 20 most recent spendings