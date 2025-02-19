const commentModel = require('../models/comment.model');
const productModel = require('./../models/product.model');

let filterPrice = async (cateId, range) => {
    let products = [];
    if (range === 'max-50') {
        let data = await productModel.getBookByPriceMax50(cateId);
        products = [...data];
    }
    if (range === 'from-50-to-150') {
        let data = await productModel.getBookByPriceFrom50to150(cateId);
        products = [...data];
    }
    if (range === 'min-150') {
        let data = await productModel.getBookByPriceMin150(cateId);
        products = [...data];
    }

    return { message: 'SUCCESS', data: products };
}

let filterRating = async (cateId, star) => {
    let products = [];
    let data = await productModel.findProductByCateId(cateId);

    data.map (v => {
        products = [...products, v._id];
    });

    let commentAvgOfBook = await commentModel.getBookIdWithRateStar(star, products);

    let arrProducts2 = [];
    commentAvgOfBook.map(v => {
        arrProducts2 = [...arrProducts2, v._id];
    });

   let response = await productModel.getManyBookInArray(arrProducts2);

    return { message: 'SUCCESS', data: response };
}

module.exports = {
    filterPrice,
    filterRating
}
