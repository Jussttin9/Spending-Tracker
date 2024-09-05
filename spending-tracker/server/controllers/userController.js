// controllers/userController.js
const User = require('../database_schema/userSchema');
const { connectToDatabase } = require('../database_schema/database');

const getUser = async (req, res) => {
    try {
        const userId = req.params.id;
        // Find the user by User ID and populates Trips
        const user = await User.findById(userId)
        .populate('items', 'field1 field2') // Populate only necessary fields
        .populate('savingsItems')
        .lean();

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const registerUser = async (id, email, savings, spending, budget) => {
    try {
        await connectToDatabase();
        var curDate = new Date();

        const newUser = new User({
            _id: id,
            createdUser: curDate,
            lastLogged: curDate,
            email: email,
            items: [],
            savingsItems: [],
            savings: savings,
            spending: spending,
            budget: budget,
            weeklySpent: 0
        });

        await newUser.save();
        return newUser._id;
    } catch (error) {
        console.error('Error creating new user:', error);
        throw error;
    }
}

// Delete user
const deleteUser = async (userID) => {
    try {
        await connectToDatabase();
        const user = await User.findById(userID);
        if (!user) {
            throw new Error('User not found in MongoDB');
        }

        // Delete the user from MongoDB
        await User.findByIdAndDelete(userID);

        console.log('Successfully deleted user:', userID);
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};

const lastUpdated = async (req, res) => {
    try {
        const { userID, newDate } = req.body;
        const user = await User.findById(userID);
        if (!user) {
            throw new Error('User not found in MongoDB');
        }

        const updatedUser = await User.findByIdAndUpdate(userID, {
            $set: {
                lastUpdated: newDate
            }
        }, { new: true })

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateSaving = async (req, res) => {
    try {
        const { userID, newSavings } = req.body;
        const user = await User.findById(userID);
        if (!user) {
            throw new Error('User not found in MongoDB');
        }

        const updatedUser = await User.findByIdAndUpdate(userID, {
            $set: {
                savings: newSavings
            }
        }, { new: true })

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateSpending = async (req, res) => {
    try {
        const { userID, newSpending } = req.body;
        const user = await User.findById(userID);
        if (!user) {
            throw new Error('User not found in MongoDB');
        }

        const updatedUser = await User.findByIdAndUpdate(userID, {
            $set: {
                spending: newSpending
            }
        }, { new: true })

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateBudget = async (req, res) => {
    try {
        const { userID, newBudget } = req.body;
        const user = await User.findById(userID);
        if (!user) {
            throw new Error('User not found in MongoDB');
        }

        const updatedUser = await User.findByIdAndUpdate(userID, {
            $set: {
                budget: newBudget
            }
        }, { new: true })

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateWeekly = async (req, res) => {
    try {
        const { userID, newWeekly } = req.body;
        const user = await User.findById(userID);
        if (!user) {
            throw new Error('User not found in MongoDB');
        }

        const updatedUser = await User.findByIdAndUpdate(userID, {
            $set: {
                weeklySpent: newWeekly
            }
        }, { new: true })

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = { registerUser, getUser, deleteUser, lastUpdated, updateSaving, updateSpending, updateBudget, updateWeekly };