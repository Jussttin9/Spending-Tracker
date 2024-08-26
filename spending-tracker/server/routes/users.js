const express = require('express');
const router = express.Router();
const { registerUser, getUser, deleteUser, lastUpdated, updateSaving, updateSpending, updateBudget, updateWeekly } = require('../controllers/userController');

// Route to get a user's information
// Example:
// const response = await.get('http://localhost:4000/get-info/${userID}');
router.get('/get-info/:id', getUser);

// Route to register a user
// Example:
    // const response = await axios.post('http://localhost:4000/register', {
    //     email: 'user@example.com',
    //     username: 'username123',
    //     id: 'asidojgruowhjfoiw'
    // });
router.post('/register', async (req, res) => {
    const { id, email, savings, spending, budget } = req.body;

    try {
        const userID = await registerUser(id, email, savings, spending, budget);
        res.status(201).json({ userID, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Route to update the last time the user logs in
// Example:
    // const response = await axios.post('http://localhost:4000/user/last-update', {
    //     userID: 'exampleID',
    //     newDate: new Date().toISOString(),
    // });
router.put('/last-updated', lastUpdated);

// Route to update the user's savings
router.put('/update-saving', updateSaving);

// Route to update the user's spendings
router.put('/update-spending', updateSpending);

// Route to update the user's budget
router.put('/update-budget', updateBudget);

// Route to update the user's weekly average
router.put('/update-weekly', updateWeekly);


// Route to delete a user
// Example:
// const response = await.delete('http://localhost:4000/delete-user/${userID}');
router.delete('/delete-user/:userID', async (req, res) => {
    const userID = req.params.userID;

    try {
        await deleteUser(userID);
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});



module.exports = router;