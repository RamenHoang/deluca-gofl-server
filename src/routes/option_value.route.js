const express = require('express');
const router = express.Router();
const optionValueController = require('../controllers/option_value.controller');

router.get('/', optionValueController.getAllOptionValues);
router.get('/:id', optionValueController.getOptionValueById);
router.post('/', optionValueController.createOptionValue);
router.put('/:id', optionValueController.updateOptionValue);
router.delete('/:id', optionValueController.deleteOptionValue);

module.exports = router;
