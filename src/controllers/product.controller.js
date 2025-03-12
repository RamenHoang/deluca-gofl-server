require("dotenv").config();
const productService = require("./../services/product.service");
const { cloudinary } = require("./../utils/cloudinary");
const ImageSchema = require("./../models/image.model");
const formatBufferToBase64 = require("./../utils/formatBufferToBase64");

let getAllProducts = async (req, res) => {
  try {
    let allProducts = await productService.getAllProducts();

    return res.status(200).json(allProducts);
  } catch (error) {
    return res.status(500).json(error);
  }
};

let addNewProduct = async (req, res) => {
  try {
    let productItem = req.body;
    let product = await productService.addNewProduct(productItem);

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};

let getByIdProduct = async (req, res) => {
  try {
    let productId = req.params.id;
    let product = await productService.getByIdProduct(productId);

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};

let deleteByIdProduct = async (req, res) => {
  try {
    let productId = req.params.id;
    let product = await productService.deleteByIdProduct(productId);

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};

let updateProductById = async (req, res) => {
  try {
    let id = req.params.id;
    let data = {
      ...req.body,
    };
    let product = await productService.updateProductById(id, data);

    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json(error);
  }
};

let changeProductHotById = async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;
    let change = await productService.changeProductHotById(id, data);

    return res.status(200).json(change);
  } catch (error) {
    return res.status(500).json(error);
  }
};

const uploadImages = async (req, res) => {
  try {
    let images = req.files;
    const newImages = [];

    for (let i = 0; i < images.length; i++) {
      const uploadedResponse = await cloudinary.uploader.upload(
        formatBufferToBase64(images[i]).content,
        { upload_preset: process.env.UPLOAD_PRESET }
      );
      const uploadedImage = new ImageSchema({
        public_id: uploadedResponse.public_id,
        url: uploadedResponse.secure_url,
      });
      await uploadedImage.save();
      newImages.push(uploadedImage._doc);
    }

    return res.status(200).json({ message: 'SUCCESS', images: newImages });
  } catch (error) {
    return res.status(500).json(error);
  }
}

module.exports = {
  getAllProducts,
  addNewProduct,
  getByIdProduct,
  updateProductById,
  deleteByIdProduct,
  changeProductHotById,
  uploadImages
};
