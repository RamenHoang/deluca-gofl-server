const mongoose = require('mongoose');

const CartSchema = mongoose.Schema({
    products: [
      { product: mongoose.Schema.Types.ObjectId ,
        quantity: Number, 
        price: Number 
      }  
    ],
    totalPrice: Number,
    totalQuantity: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

CartSchema.statics = {
    addNewCart (data) {
        return this.create(data);
    },



    getOldCartOfUser(userId) {
        return this.findOne({ user: userId }).populate('user').populate('product').exec();
    },

    checkExistsProducInCart (productId) {
        return this.findOne({ 'products.product': productId }).exec();
    }
}

module.exports = mongoose.model('Cart', CartSchema, 'cart');
