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

  let responseUploadDetails = await Promise.all(
    productItem.p_images.map(image =>
      cloudinary.uploader.upload(formatBufferToBase64(image).content, {
        upload_preset: process.env.UPLOAD_PRESET,
      })
    )
  );

  if (responseUploadDetails.some(response => !response)) {
    return { message: "UPLOAD_FAILED" };
  }

  let responseData = responseUploadDetails.map(response => ({
    public_id: response.public_id,
    url: response.secure_url,
  }));

  delete productItem.p_images;

  productItem = {
    ...productItem,
    p_images: responseData,
    p_slug: slugify(productItem.p_name),
  };

  // Ensure only the last item in the same option_value group is retained
  if (!productItem.variants) {
    productItem.variants = [];
  }
  const uniqueVariants = [];
  const optionValueSet = new Set();
  for (let i = productItem.variants.length - 1; i >= 0; i--) {
    if (!optionValueSet.has(productItem.variants[i].option_value.toString())) {
      uniqueVariants.push(productItem.variants[i]);
      optionValueSet.add(productItem.variants[i].option_value.toString());
    }
  }
  productItem.variants = uniqueVariants.reverse();

  let newProduct = await productModel.addNewProduct(productItem);

  return { message: "SUCCESS", data: newProduct };
};

let deleteByIdProduct = async (productId) => {
  let product = await productModel.getByIdProduct(productId);

  if (!product) {
    return { message: "PRODUCT_NOT_FOUND" };
  }

  let responseDestroyAvatars = await Promise.all(
    product.p_images.map(image =>
      cloudinary.uploader.destroy(image.public_id)
    )
  );

  if (responseDestroyAvatars.some(response => !response)) {
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

  if (data.p_images) {
    let responseDestroyAvatars = await Promise.all(
      product.p_images.map(image =>
        cloudinary.uploader.destroy(image.public_id)
      )
    );

    if (responseDestroyAvatars.some(response => !response)) {
      return { message: "DESTROY_IMAGE_FAILED" };
    }

    let responseUploadDetails = await Promise.all(
      data.p_images.map(image =>
        cloudinary.uploader.upload(formatBufferToBase64(image).content, {
          upload_preset: process.env.UPLOAD_PRESET,
        })
      )
    );

    if (responseUploadDetails.some(response => !response)) {
      return { message: "UPLOAD_FAILED" };
    }

    let responseData = responseUploadDetails.map(response => ({
      public_id: response.public_id,
      url: response.secure_url,
    }));

    data.p_images = responseData;
  } else {
    delete data.p_images;
  }

  data = {
    ...data,
    p_slug: slugify(data.p_name),
  };

  // Ensure only the last item in the same option_value group is retained
  const uniqueVariants = [];
  const optionValueSet = new Set();
  for (let i = data.variants.length - 1; i >= 0; i--) {
    if (!optionValueSet.has(data.variants[i].option_value.toString())) {
      uniqueVariants.push(data.variants[i]);
      optionValueSet.add(data.variants[i].option_value.toString());
    }
  }
  data.variants = uniqueVariants.reverse();

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
