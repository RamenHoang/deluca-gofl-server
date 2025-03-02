const productService = require("./../services/product.service");

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
    productItem = {
      ...productItem,
      variant_images: req.files,
    };
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

module.exports = {
  getAllProducts,
  addNewProduct,
  getByIdProduct,
  updateProductById,
  deleteByIdProduct,
  changeProductHotById,
};
