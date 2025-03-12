const express = require('express');
const colorController = require('./../controllers/color.controller');

const router = express.Router();

router.get('/', colorController.getAll);
router.post('/', colorController.create);
router.delete('/:id', colorController.deleteById);
router.put('/:id', colorController.updateById);

module.exports = router;
