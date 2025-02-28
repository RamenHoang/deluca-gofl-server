const express = require('express');
const router = express.Router();
const optionController = require('../controllers/option.controller');

router.get('/', optionController.getAllOptions);
router.get('/:id', optionController.getOptionById);
router.post('/', optionController.createOption);
router.put('/:id', optionController.updateOption);
router.delete('/:id', optionController.deleteOption);

module.exports = router;
