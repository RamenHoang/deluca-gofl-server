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

  let responseUploadDetail = await cloudinary.uploader.upload(
    formatBufferToBase64(productItem.p_image_detail).content,
    {
      upload_preset: process.env.UPLOAD_PRESET,
    }
  );

  if (!responseUploadDetail) {
    return { message: "UPLOAD_FAILED" };
  }

  let responseData = {
    public_id: responseUploadDetail.public_id,
    url: responseUploadDetail.secure_url,
  };

  delete productItem.p_image_detail;

  productItem = {
    ...productItem,
    p_image_detail: responseData,
    p_slug: slugify(productItem.p_name),
  };

  let newProduct = await productModel.addNewProduct(productItem);

  return { message: "SUCCESS", data: newProduct };
};

let deleteByIdProduct = async (productId) => {
  let product = await productModel.getByIdProduct(productId);

  if (!product) {
    return { message: "PRODUCT_NOT_FOUND" };
  }

  let responseDestroyAvatar = await cloudinary.uploader.destroy(
    product.p_image_detail.public_id
  );

  if (!responseDestroyAvatar) {
    return { message: "DESTROY_IMAGE_FAILED" };
  }

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

  if (!data.p_image_detail) {
    delete data.p_image_detail;
    data = {
      ...data,
      p_slug: slugify(data.p_name),
    };
    await productModel.updateProductById(id, data);
    return { message: "SUCCESS" };
  }

  let responseDestroyAvatar = await cloudinary.uploader.destroy(
    product.p_image_detail.public_id
  );

  if (!responseDestroyAvatar) {
    return { message: "DESTROY_IMAGE_FAILED" };
  }

  let responseUploadDetail = await cloudinary.uploader.upload(
    formatBufferToBase64(data.p_image_detail).content,
    {
      upload_preset: process.env.UPLOAD_PRESET,
    }
  );

  if (!responseUploadDetail) {
    return { message: "UPLOAD_FAILED" };
  }

  let responseData = {
    public_id: responseUploadDetail.public_id,
    url: responseUploadDetail.secure_url,
  };

  delete data.p_image_detail;

  data = {
    ...data,
    p_image_detail: responseData,
    p_slug: slugify(data.p_name),
  };

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
