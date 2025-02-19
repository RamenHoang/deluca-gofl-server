const filterService = require("./../services/filter.service");

let filterPrice = async (req, res) => {
  try {
    let cateId = req.params.id;
    let range = req.body.range;
    let products = await filterService.filterPrice(cateId, range);

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};

let filterRating = async (req, res) => {
  try {
    let cateId = req.params.id;
    let star = req.body.star;
    let products = await filterService.filterRating(cateId, star);

    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  filterPrice,
  filterRating,
};
