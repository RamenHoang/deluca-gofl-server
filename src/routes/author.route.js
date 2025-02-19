const express = require('express');
const multer = require('multer');
const router = express.Router();

// const upload = multer();
const authorController = require('./../controllers/author.controller');

router.get('/', authorController.getAllAuthors);
router.post('/', authorController.addNewAuthor);
router.get('/:id', authorController.getAuthorById);
router.delete('/:id', authorController.deleteAuthorById);

module.exports = router;
