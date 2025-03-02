const express = require("express");
const multer = require("multer");
const productController = require("./../controllers/product.controller");

const upload = multer();
const router = express.Router();

router.get("/", productController.getAllProducts);
router.post(
  "/",
  upload.array("variant_images"),
  productController.addNewProduct
);
router.get("/:id", productController.getByIdProduct);
router.put(
  "/:id",
  upload.fields([{ name: 'p_images' }, { name: 'variant_images' }]),
  productController.updateProductById
);
router.delete("/:id", productController.deleteByIdProduct);
router.put("/change-product-hot/:id", productController.changeProductHotById);

module.exports = router;
