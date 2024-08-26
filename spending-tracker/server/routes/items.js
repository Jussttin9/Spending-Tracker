const express = require('express');
const router = express.Router();
const { addItem, deleteItem } = require('../controllers/itemController');

router.post('/add-item', addItem);

router.delete('/delete-item', deleteItem);

module.exports = router;