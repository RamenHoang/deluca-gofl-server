const { default: slugify } = require("slugify");
const productModel = require("./../models/product.model");
const { cloudinary } = require("./../utils/cloudinary");
const formatBufferToBase64 = require("./../utils/formatBufferToBase64");

let getAllProducts = async () => {
  let allProducts = await productModel.getAllProducts();

  return { message: "SUCCESS", data: allProducts };
};

let getByIdProduct = async (productId) => {
  let product = await productModel.getByIdProduct(productId);

  if (!product) {
    return { message: "PRODUCT_NOT_FOUND" };
  }

  return { message: "SUCCESS", data: product };
};

let addNewProduct = async (productItem) => {
  let product = await productModel.getProductByCode(productItem.p_code);

  if (product) {
    return { message: "PRODUCT_EXISTS" };
  }

  productItem = {
    ...productItem,
    p_slug: slugify(productItem.p_name),
  };

  if (productItem.p_promotion === "null") {
    product.p_promotion = 0;
  }

  let newProduct = await productModel.addNewProduct(productItem);

  return { message: "SUCCESS", data: newProduct };
};

let deleteByIdProduct = async (productId) => {
  let product = await productModel.getByIdProduct(productId);

  if (!product) {
    return { message: "PRODUCT_NOT_FOUND" };
  }

  // let responseDestroyAvatars = await Promise.all(
  //   product.p_images.map(image =>
  //     cloudinary.uploader.destroy(image.public_id)
  //   )
  // );

  // if (responseDestroyAvatars.some(response => !response)) {
  //   return { message: "DESTROY_IMAGE_FAILED" };
  // }

  await productModel.deleteByIdProduct(productId);

  return { message: "SUCCESS" };
};

let updateProductById = async (id, data) => {
  //Kiem tra san pham do co ton tai hay khong (truong hop dang update ma bi xoa trong database)
  let product = await productModel.getByIdProduct(id);
  if (!product) {
    return { message: "PRODUCT_NOT_FOUND" };
  }

  //Kiem tra ma san pham co trung voi ma san pham khac hay khong
  let check = await productModel.getProductByCodeAndCheckExistsCode(
    id,
    data.p_code
  );

  if (check) {
    return { message: "EXISTS_CODE" };
  }

  data = {
    ...data,
    p_slug: slugify(data.p_name),
  };

  if (data.p_promotion === "null") {
    data.p_promotion = 0;
  }

  await productModel.updateProductById(id, data);

  return { message: "SUCCESS" };
};

let changeProductHotById = async (id, data) => {
  let product = await productModel.getByIdProduct(id);
  if (!product) {
    return { message: "PRODUCT_NOT_FOUND" };
  }

  await productModel.updateFieldProductHotById(id, data.status);

  return { message: "SUCCESS" };
};

module.exports = {
  getAllProducts,
  getByIdProduct,
  addNewProduct,
  deleteByIdProduct,
  updateProductById,
  changeProductHotById,
};
