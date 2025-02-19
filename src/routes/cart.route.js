const express = require('express');
const cartController = require('./../controllers/cart.controller');

const router = express.Router();

router.get('/add-new-cart/:id', cartController.addNewCart);
router.get('/delete-item-cart/:id', cartController.removeItemCart);

module.exports = router;
