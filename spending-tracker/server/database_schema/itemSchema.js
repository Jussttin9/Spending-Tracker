const mongoose = require('mongoose');
const { Schema } = mongoose;

const ItemSchema = new Schema({
    name: String,
    cost: Number
});

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;