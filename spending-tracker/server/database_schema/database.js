const mongoose = require('mongoose');
const User = require('./userSchema');
const Item = require('./itemSchema');

const connectToDatabase = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Connected to MongoDB database');
    } catch (error) {
        console.error('Error connecting to MongoDB database:', error.message);
        console.error('Make sure that your DB_URL in the .env file is correct.');
    }
};

module.exports = { connectToDatabase, User, Item };