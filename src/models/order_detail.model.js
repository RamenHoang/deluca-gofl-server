const mongoose = require('mongoose');

const OrderDetailSchema = mongoose.Schema({
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
            variant: {
                color: { type: mongoose.Schema.Types.ObjectId, ref: "Color", required: true },
                images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image", required: true }],
                sizes: [
                    {
                        size: { type: mongoose.Schema.Types.ObjectId, ref: "Size", required: true },
                        stock: { type: Number, required: true },
                    }
                ]
            },
            size: { type: mongoose.Schema.Types.ObjectId, ref: 'Size', required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
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

    // getOrderDetailByOrder(orderId) {
    //     return this.find({ order: orderId })
    //         .populate('products.product')
    //         .populate({
    //             path: 'products.variant.images',
    //             model: 'Image'
    //         })
    //         .populate('products.color')
    //         .populate('products.size')
    //         .populate('order')
    //         .exec();
    // },

    //admin
    getOrderDetailByOrder(orderId) {
        return this.findOne({ order: orderId })
            .populate('products.product')
            .populate({
                path: 'products.variant.images',
                model: 'Image'
            })
            .populate({
                path: 'products.variant.color',
                model: 'Color'
            })
            .populate('products.size')
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
        ])
        .exec();
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
