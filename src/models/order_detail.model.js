const mongoose = require('mongoose');

const OrderDetailSchema = mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
            quantity: Number,
            price: Number,
            variant: { type: Object, default: null }
        }
    ],
    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    createdAt: { type: Date, default: new Date() }
});

OrderDetailSchema.statics = {
    //Customer
    addNewOrderDetail(data) {
        return this.create(data);
    },

    getOrderDetailByOrder(orderId) {
        return this.find({ order: orderId })
            .populate('products.product')
            .populate('order')
            .exec();
    },

    //admin
    getOrderDetailByOrder(orderId) {
        return this.findOne({ order: orderId })
            .populate('products.product')
            .populate('order')
            .exec();
    },

    productsBestSeller() {
        return this.aggregate([
            { $unwind: "$products" },
            { $group: { _id: '$products.product', quantity: { $sum: '$products.quantity' } } },
            { $sort: { quantity: -1 } },
            { $lookup: { from: 'product', localField: '_id', foreignField: '_id', as: 'productDetail' } },
            { $limit: 7 }
        ]).exec();
    },

    getBooksBestSeller() {
        return this.aggregate([
            { $unwind: "$products" },
            { $group: { _id: '$products.product', quantity: { $sum: '$products.quantity' } } },
            { $sort: { quantity: -1 } },
            { $limit: 7 }
        ]).exec();
    }
}

module.exports = mongoose.model('OrderDetail', OrderDetailSchema, 'order_detail');
