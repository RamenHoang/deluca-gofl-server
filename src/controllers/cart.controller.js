const cartService = require("./../services/cart.service");

let addNewCart = async (req, res) => {
  try {
    let bookId = req.params.id;
    let user = req.user;

    let cart = await cartService.addNewCart(user, bookId);

    return res.status(200).json(cart);
  } catch (error) {
    return res.status(500).json(error);
  }
};

let removeItemCart = async (req, res) => {
  try {
    let id = req.params.id;

    let oldCart = req.session.cart;

    let newCart = await cartService.removeItemCart(oldCart, id);

    req.session.cart = newCart.data;

    return res.status(200).json(newCart);
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  addNewCart,
  removeItemCart,
};
