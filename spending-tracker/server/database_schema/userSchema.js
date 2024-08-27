const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserSchema = new Schema({
    _id: String,
    createdUser: Date,
    lastLogged: Date,
    email: String,
    items: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    savingsItems: [{
        type: Schema.Types.ObjectId,
        ref: 'Item'
    }],
    savings: Number,
    spending: Number,
    budget: Number,
    weeklySpent: Number
});

const User = mongoose.model('User', UserSchema);

module.exports = User;