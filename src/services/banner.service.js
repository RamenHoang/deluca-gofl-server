const bannerModel = require("./../models/banner.model");
const { cloudinary } = require("./../utils/cloudinary");
const formatBufferToBase64 = require("./../utils/formatBufferToBase64");

let getAllBanners = async () => {
  let banners = await bannerModel.getAllBanners();

  return { message: "SUCCESS", data: banners };
};

let addNewBanner = async (data) => {
  let responseUploadDetail = await cloudinary.uploader.upload(
    formatBufferToBase64(data.b_image).content,
    {
      upload_preset: process.env.UPLOAD_PRESET,
    }
  );

  let responseData = {
    public_id: responseUploadDetail.public_id,
    url: responseUploadDetail.secure_url,
  };

  if (!responseUploadDetail) {
    return { message: "UPLOAD_FAILED" };
  }

  delete data.b_image;

  data = {
    ...data,
    b_image: responseData,
  };

  await bannerModel.addNewBanner(data);
  return { message: "SUCCESS" };
};

let deleteBannerById = async (id) => {
  let banner = await bannerModel.findBannerById(id);

  if (!banner) {
    return { message: "BANNER_NOT_FOUND" };
  }

  let responseDestroyAvatar = await cloudinary.uploader.destroy(
    banner.b_image.public_id
  );

  if (!responseDestroyAvatar) {
    return { message: "DESTROY_IMAGE_FAILED" };
  }

  await bannerModel.deleteBannerById(id);
  return { message: "SUCCESS" };
};

let getBannerById = async (id) => {
  let banner = await bannerModel.findBannerById(id);
  if (!banner) {
    return { message: "BANNER_NOT_FOUND" };
  }

  return { message: "SUCCESS", data: banner };
};

let updateBannerById = async (id, data) => {
  let banner = await bannerModel.findBannerById(id);
  if (!banner) {
    return { message: "BANNER_NOT_FOUND" };
  }

  if (!data.b_image) {
    delete data.b_image;
    await bannerModel.updateBannerById(id, data);
    return { message: "SUCCESS" };
  }

  let responseDestroyAvatar = await cloudinary.uploader.destroy(
    banner.b_image.public_id
  );

  if (!responseDestroyAvatar) {
    return { message: "DESTROY_IMAGE_FAILED" };
  }

  let responseUploadDetail = await cloudinary.uploader.upload(
    formatBufferToBase64(data.b_image).content,
    {
      upload_preset: process.env.UPLOAD_PRESET,
    }
  );

  let responseData = {
    public_id: responseUploadDetail.public_id,
    url: responseUploadDetail.secure_url,
  };

  if (!responseUploadDetail) {
    return { message: "UPLOAD_FAILED" };
  }

  delete data.b_image;

  data = {
    ...data,
    b_image: responseData,
  };

  await bannerModel.updateBannerById(id, data);
  return { message: "SUCCESS" };
};

module.exports = {
  getAllBanners,
  addNewBanner,
  deleteBannerById,
  getBannerById,
  updateBannerById,
};
