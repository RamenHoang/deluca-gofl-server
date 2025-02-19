const express = require('express');
const filterController = require('./../controllers/filter.controller');
const router = express.Router();

router.post('/filter-price/:id', filterController.filterPrice);
router.post('/filter-rating/:id', filterController.filterRating);

module.exports = router;
