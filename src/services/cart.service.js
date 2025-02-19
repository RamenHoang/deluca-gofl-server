const Cart = require('./../models/cart.model');
const productModel = require('./../models/product.model');

let addNewCart = async (oldCart, productId) => {

    let product = await productModel.getByIdProduct(productId);
  
    if (!product) {
        return { message: 'PRODUCT_NOT_FOUND' };
    }

    let cart = new Cart(oldCart ? oldCart : null);

    cart.addCart(product, productId);

    return { message: 'SUCCESS', data: cart };
}

let removeItemCart = (oldCart, productId) => {
    let cart = new Cart (oldCart ? oldCart : null);

    cart.removeItemCart(productId);

    return { message: 'SUCCESS', data: cart };
}

module.exports = {
    addNewCart,
    removeItemCart
}