const orderModel = require('./../models/order.model');
const orderDetailModel = require('./../models/order_detail.model');
const calculateShippingFee = require('./../utils/calculateShippingFee');
const randomString = require('randomstring');

//Customer
let shippingFee = (method) => {
    let fee = calculateShippingFee(method);
    return fee;
}

let addNewOrder = async (data, user) => {

    let productDetail = [...data.products];
    let products = [];
    productDetail.map(v => {
        products = [...products, { product: v.productInfo._id, quantity: v.quantity, price: v.price }];
    });

    delete data.products;

    data = {
        ...data,
        o_code: randomString.generate(7),
        user: user._id,
        o_totalPrice: data.totalPrice
    }

    let order = await orderModel.addNewOrder(data);
    if (!order) {
        return { message: 'FAILED' };
    }

    let orderDetail = {
        products: [...products],
        order: order._id
    }

    await orderDetailModel.addNewOrderDetail(orderDetail);

    return { message: 'SUCCESS' };
}

let getOrderByUserId = async (userId) => {
    let order = await orderModel.getAllOrderOfUser(userId);

    return { message: 'SUCCESS', data: order };
}

let getOrderDetailByCode = async (code) => {
    let order = await orderModel.getOrderByCode(code);
    let orderdetail = await orderDetailModel.getOrderDetailByOrder(order._id);

    return { message: 'SUCCESS', data: orderdetail };
}

let destroyOrder = async (id) => {

    let order = await orderModel.getOrderById(id);
    if (!order) {
        return { message: 'NOT_FOUND' };
    }

    await orderModel.changeStatusOrder(id, "Đã hủy");

    return { message: 'SUCCESS' };
}



//Admin
let getAllOrders = async () => {
    let orders = await orderModel.getAllOrders();

    return { message: 'SUCCESS', data: orders };
}

let getOrderDetailByOrder = async (orderId) => {
    let orderdetail = await orderDetailModel.getOrderDetailByOrder(orderId);

    return { message: 'SUCCESS', data: orderdetail };
}

let changeStatusOrder = async (id, data) => {
    let order = await orderModel.getOrderById(id);
    if (!order) {
        return { message: 'NOT_FOUND' };
    }

    await orderModel.changeStatusOrder(id, data.o_status);

    return { message: 'SUCCESS' };
}

let filterByStatus = async (status) => {
    if (status === '') {
        let orders = await orderModel.getAllOrders();
        return { message: 'SUCCESS', data: orders };
    }
    let order = await orderModel.getOrderByStatus(status);
    return { message: 'SUCCESS', data: order };
}

module.exports = {
    //Customer
    addNewOrder,
    shippingFee,
    getOrderByUserId,
    getOrderDetailByCode,
    destroyOrder,

    //Admin
    getAllOrders,
    getOrderDetailByOrder,
    changeStatusOrder,
    filterByStatus
}
