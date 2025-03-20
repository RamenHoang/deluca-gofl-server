const express = require('express');
const multer = require('multer');

const paymentController = require('./../controllers/payment.controller');

const router = express.Router();

const upload = multer({
  limits: { fileSize: 1024 * 1024 * 50 },
});

router.get('/', paymentController.getPaymentInfo);
router.put('/', paymentController.updatePaymentInfo);
router.post('/upload', upload.single('file'), paymentController.uploadQRCode);

module.exports = router;
