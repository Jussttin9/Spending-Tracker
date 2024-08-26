const Item = require('../database_schema/itemSchema');
const User = require('../database_schema/userSchema');

const addItem = async (req, res) => {
    try {
        const { userID, name, cost } = req.body;
        const user = await User.findById(userID);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const newItem = new Item ({
            name: name,
            cost: cost
        })

        await newItem.save();
        user.items.push(newItem);
        await user.save();

        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const deleteItem = async (req, res) => {
    try {
        const { userID, item_id } = req.body;
        const user = await User.findById(userID).populate('items');

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.items = user.items.filter((item) => item && item._id != item_id);

        await user.save();
        await Item.findByIdAndDelete(item_id);

        res.status(201).json(user.items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = { addItem, deleteItem };