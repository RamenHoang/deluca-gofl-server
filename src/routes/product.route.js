const express = require("express");
const multer = require("multer");
const productController = require("./../controllers/product.controller");

const upload = multer({
  limits: { fileSize: 1024 * 1024 * 50 },
});
const router = express.Router();

router.post('/upload', upload.array('variant_images'), productController.uploadImages);
router.get("/", productController.getAllProducts);
router.post("/", productController.addNewProduct);
router.get("/:id", productController.getByIdProduct);
router.put("/:id", productController.updateProductById);
router.delete("/:id", productController.deleteByIdProduct);
router.put("/change-product-hot/:id", productController.changeProductHotById);

module.exports = router;
