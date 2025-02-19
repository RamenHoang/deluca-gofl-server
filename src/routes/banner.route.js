const express = require("express");
const router = express.Router();
const multer = require("multer");
const upload = multer();
const bannerController = require("./../controllers/banner.controller");

router.get("/", bannerController.getAllBanners);
router.post("/", upload.single("b_image"), bannerController.addNewBanner);
router.get("/:id", bannerController.getBannerById);
router.delete("/:id", bannerController.deleteBannerById);
router.put("/:id", upload.single("b_image"), bannerController.updateBannerById);

module.exports = router;
