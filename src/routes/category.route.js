const express = require('express');
const categoryController = require('./../controllers/category.controller');

const router = express.Router();

router.get('/', categoryController.getAllCategory);
router.post('/', categoryController.addNewCategory);
router.delete('/:id', categoryController.deleteCategory);
router.get('/:id', categoryController.getByIdCategory);
router.put('/:id', categoryController.updateCategory);

module.exports = router;
