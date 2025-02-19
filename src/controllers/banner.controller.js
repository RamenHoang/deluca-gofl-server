const bannerService = require("./../services/banner.service");

let getAllBanners = async (req, res) => {
  try {
    let banners = await bannerService.getAllBanners();

    return res.status(200).json(banners);
  } catch (error) {
    return res.status(500).json(error);
  }
};

let addNewBanner = async (req, res) => {
  try {
    let data = {
      ...req.body,
      b_image: req.file,
    };
    let banner = await bannerService.addNewBanner(data);

    return res.status(200).json(banner);
  } catch (error) {
    return res.status(500).json(error);
  }
};

let deleteBannerById = async (req, res) => {
  try {
    let id = req.params.id;
    let banner = await bannerService.deleteBannerById(id);

    return res.status(200).json(banner);
  } catch (error) {
    return res.status(500).json(error);
  }
};

let getBannerById = async (req, res) => {
  try {
    let id = req.params.id;
    let banner = await bannerService.getBannerById(id);

    return res.status(200).json(banner);
  } catch (error) {
    return res.status(500).json(error);
  }
};

let updateBannerById = async (req, res) => {
  try {
    let id = req.params.id;
    let data = {
      ...req.body,
      b_image: req.file,
    };
    let banner = await bannerService.updateBannerById(id, data);

    return res.status(200).json(banner);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  getAllBanners,
  addNewBanner,
  deleteBannerById,
  getBannerById,
  updateBannerById,
};
