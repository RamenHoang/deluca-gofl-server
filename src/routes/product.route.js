const express = require("express");
const multer = require("multer");
const productController = require("./../controllers/product.controller");

const upload = multer();
const router = express.Router();

router.get("/", productController.getAllProducts);
router.post(
  "/",
  upload.single("p_image_detail"),
  productController.addNewProduct
);
router.get("/:id", productController.getByIdProduct);
router.put(
  "/:id",
  upload.single("p_image_detail"),
  productController.updateProductById
);
router.delete("/:id", productController.deleteByIdProduct);
router.put("/change-product-hot/:id", productController.changeProductHotById);

module.exports = router;
