const express = require('express');
const contactController = require('./../controllers/contact.controller');

const router = express.Router();

router.post('/', contactController.contact);

module.exports = router;
