const orderModel = require('./../models/order.model');
const orderDetailModel = require('./../models/order_detail.model'); 
const userModel = require('./../models/user.model');
const productModel = require('./../models/product.model');
const commentModel = require('./../models/comment.model');

let countAllOrders = async () => {
    let count = await orderModel.countAllOrders();

    return { message: 'SUCCESS', data: count };
}

let countNewOrders = async () => {
    let count = await orderModel.countNewOrders();

    return { message: 'SUCCESS', data: count };
}

let countUserRegister = async () => {
    let count = await userModel.countUserRegister();

    return { message: 'SUCCESS', data: count };
}

let countAllProducts = async () => {
    let count = await productModel.countAllProducts();

    return { message: 'SUCCESS', data: count };
}

let countAllRates = async () => {
    let count = await commentModel.countAllRates();

    return { message: 'SUCCESS', data: count };
}

let salesDay = async () => {

    let money = await orderModel.salesDay();

    let total = 0;

    money.map(v => {
        total += v.o_totalPrice;
    })

    return { message: 'SUCCESS', data: total };
}

let salesMonth = async () => {
    let money = await orderModel.salesMonth();

    let total = 0;

    money.map(v => {
        total += v.o_totalPrice;
    })

    return { message: 'SUCCESS', data: total };
}


let salesYear = async () => {
    let money = await orderModel.salesYear();

    let total = 0;

    money.map(v => {
        total += v.o_totalPrice;
    })

    return { message: 'SUCCESS', data: total };
}

let statisticalOrderStatus = async () => {
    let data = await orderModel.statisticalOrderStatus();

    let arr = [0, 0, 0, 0, 0]; //[Dat hang thanh cong, Tiep nhan, Dang giao hang, Da giao hang, Da huy]

    data.map(v => {
        if (v._id === 'Đặt hàng thành công') {
            arr[0] = v.count;
        }
        if (v._id === 'Tiếp nhận') {
            arr[1] = v.count;
        }
        if (v._id === 'Đang giao hàng') {
            arr[2] = v.count;
        }

        if (v._id === 'Đã giao hàng') {
            arr[3] = v.count;
        }

        if (v._id === 'Đã hủy') {
            arr[4] = v.count;
        }
    });
    return { message: 'SUCCESS', data: arr };
}

let saleMonthOfYear = async () => {
    let data = await orderModel.saleMonthOfYear();

    let arrMonth = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]; //Doanh thu cac thang trong nam
    
    data.map(v => {
        arrMonth[v._id - 1] = v.totalAmount;
    });

    return { message: 'SUCCESS', data: arrMonth };
}

let productsBestSeller = async () => {
    let products = await orderDetailModel.productsBestSeller();

    return { message: 'SUCESS', data: products };
}


module.exports = {
    countAllOrders,
    countNewOrders,
    countUserRegister,
    countAllProducts,
    countAllRates,

    salesDay,
    salesMonth,
    salesYear,

    statisticalOrderStatus,

    saleMonthOfYear,

    productsBestSeller
}
