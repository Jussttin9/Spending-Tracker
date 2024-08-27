const express = require('express');
const router = express.Router();
const { addItem, addSavingItem, deleteItem, deleteSavingItem } = require('../controllers/itemController');

router.post('/add-item', addItem);
router.post('/add-saving', addSavingItem);

router.delete('/delete-item', deleteItem);
router.delete('/delete-saving', deleteSavingItem);

module.exports = router;