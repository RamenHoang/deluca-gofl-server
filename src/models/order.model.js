const mongoose = require('mongoose');

const OrderSchema = mongoose.Schema({
    o_code: String,
    o_status: { type: String, default: 'Đặt hàng thành công' }, //Đặt hàng thành công, Tiếp nhận, Đang giao hàng, Đã giao hàng, Đã hủy
    o_phone: String,
    o_email: String,
    o_firstName: String,
    o_lastName: String,
    o_shippingAddress1: String,
    o_shippingHouseNumber: String,
    o_shippingAddress2: String,
    o_shippingCity: String,
    o_shippingCountry: String,
    o_shippingState: String,
    o_shippingPostalcode: String,
    o_payment: { type: String, default: 'pay-cash' },
    o_shippingFee: Number,
    o_totalPrice: Number,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, {
    timestamps: true
});

OrderSchema.statics = {
    addNewOrder(data) {
        return this.create(data);
    },

    getAllOrderOfUser(userId) {
        return this.find({ user: userId }).sort({ createdAt: -1 }).exec();
    },

    getOrderById(id) {
        return this.findById(id).exec();
    },

    getOrderByCode(code) {
        return this.findOne({ o_code: code }).exec();
    },

    getAllOrders() {
        return this.find({}).sort({ createdAt: -1 }).exec();
    },

    getOrderByStatusAndPayment(status, payment) {
        if (!status && !payment) {
            return this.find({}).sort({ createdAt: -1 }).exec();
        }
        if (!status && payment) {
            return this.find({ o_payment: payment }).sort({ createdAt: -1 }).exec();
        }
        if (status && !payment) {
            return this.find({ o_status: status }).sort({ createdAt: -1 }).exec();
        }
        return this.find({ o_status: status, o_payment: payment }).sort({ createdAt: -1 }).exec();
    },

    changeStatusOrder(id, o_status) {
        return this.findByIdAndUpdate(id, { o_status: o_status, updatedAt: new Date() }).exec();
    },

    countAllOrders() {
        return this.find({}).countDocuments();
    },

    countNewOrders() {
        return this.find({ o_status: 'Đặt hàng thành công' }).countDocuments();
    },

    //Doanh thu ngay hien tai
    salesDay() {
        return this.aggregate([
            { $match: { o_status: 'Đã giao hàng' } },
            { $project: { o_totalPrice: 1, "year": { $year: '$updatedAt' }, "month": { $month: '$updatedAt' }, 'day': { $dayOfMonth: '$updatedAt' } } },
            { $match: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() } }
        ]).exec();
    },

    //Doanh thu thang hien tai
    salesMonth() {
        return this.aggregate([
            { $match: { o_status: 'Đã giao hàng' } },
            { $project: { o_totalPrice: 1, "year": { $year: '$updatedAt' }, "month": { $month: '$updatedAt' }, 'day': { $dayOfMonth: '$updatedAt' } } },
            { $match: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 } }
        ]).exec();
    },

    //Doanh thu cua nam hien tai
    salesYear() {
        return this.aggregate([
            { $match: { o_status: 'Đã giao hàng' } },
            { $project: { o_totalPrice: 1, "year": { $year: '$updatedAt' }, "month": { $month: '$updatedAt' }, 'day': { $dayOfMonth: '$updatedAt' } } },
            { $match: { year: new Date().getFullYear() } }
        ]).exec();
    },

    //Bieu do thong ke trang thai don hang
    statisticalOrderStatus() {
        return this.aggregate([
            {
                $group: {
                    _id: '$o_status',
                    count: { $sum: 1 }
                }
            }
        ]).exec();
    },

    //Bieu do doanh thu thang trong nam
    saleMonthOfYear() {
        return this.aggregate([
            { $match: { o_status: 'Đã giao hàng' } },
            { $project: { o_totalPrice: 1, "year": { $year: '$updatedAt' }, "month": { $month: '$updatedAt' } } },
            { $match: { year: new Date().getFullYear() } },
            { $group: { _id: '$month', totalAmount: { $sum: '$o_totalPrice' } } }
        ]).exec();
    }

}

module.exports = mongoose.model('Order', OrderSchema, 'order');
