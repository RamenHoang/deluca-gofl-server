const express = require('express');
const sizeController = require('./../controllers/size.controller');

const router = express.Router();

router.get('/', sizeController.getAll);
router.post('/', sizeController.create);
router.delete('/:id', sizeController.deleteById);
router.put('/:id', sizeController.updateById);

module.exports = router;
