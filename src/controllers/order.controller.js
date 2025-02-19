const orderService = require('./../services/order.service');

//Customer
let calculateShippingFee = async (req, res) => {
    try {
        let method = req.body.method;
        let shippingFee = await orderService.shippingFee(method);

        return res.status(200).json(shippingFee);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let addNewOrder = async (req, res) => {
    try {
        let data = req.body;
        let user = req.user;
        let order = await orderService.addNewOrder(data, user);

        return res.status(200).json(order);
    } catch (error) {
        return res.status(500).json(error);
    }   
}

let getOrderByUserId = async (req, res) => {
    try {
        let order = await orderService.getOrderByUserId(req.user._id);

        return res.status(200).json(order);
    } catch (error) {   
        return res.status(500).json(error);
    }
}

let getOrderDetailByCode = async (req, res) => {
    try {
        let code = req.params.code;
        let orderdetail = await orderService.getOrderDetailByCode(code);

        return res.status(200).json(orderdetail);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let destroyOrder = async (req, res) => {
    try {
        let id = req.params.id;
        let destroy = await orderService.destroyOrder(id);

        return res.status(200).json(destroy);
    } catch (error) {
        return res.status(500).json(error);
    }
}

//Admin
let getAllOrders = async (req, res) => {
    try {
        let orders = await orderService.getAllOrders();

        return res.status(200).json(orders);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let getOrderDetailByOrder = async (req, res) => {
    try {
        let orderId = req.params.id;
        let orderdetail = await orderService.getOrderDetailByOrder(orderId);

        return res.status(200).json(orderdetail);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let changeStatusOrder = async (req, res) => {
    try {
        let orderId = req.params.id;
        let data = req.body;
        let change = await orderService.changeStatusOrder(orderId, data);

        return res.status(200).json(change);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let filterByStatus = async (req, res) => {
    try {
        let query = req.query.status;
        let data = await orderService.filterByStatus(query);

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    //Customer
    destroyOrder,
    addNewOrder,
    calculateShippingFee,
    getOrderByUserId,
    getOrderDetailByCode,

    //Admin
    getAllOrders,
    getOrderDetailByOrder,
    changeStatusOrder,
    filterByStatus
}
