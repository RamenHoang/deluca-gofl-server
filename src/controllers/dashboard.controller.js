const dashboardService = require('./../services/dashboard.service');

let countAllOrders = async (req, res) => {
    try {
        let count = await dashboardService.countAllOrders();

        return res.status(200).json(count);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let countNewOrders = async (req, res) => {
    try {
        let count = await dashboardService.countNewOrders();

        return res.status(200).json(count);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let countUserRegister = async (req, res) => {
    try {
        let count = await dashboardService.countUserRegister();

        return res.status(200).json(count);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let countAllProducts = async (req, res) => {
    try {
        let count = await dashboardService.countAllProducts();

        return res.status(200).json(count);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let countAllRates = async (req, res) => {
    try {
        let count = await dashboardService.countAllRates();

        return res.status(200).json(count);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let salesDay = async (req, res) => {
    try {
        let money = await dashboardService.salesDay();

        return res.status(200).json(money);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let salesMonth = async (req, res) => {
    try {
        let money = await dashboardService.salesMonth();

        return res.status(200).json(money);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let salesYear = async (req, res) => {
    try {
        let money = await dashboardService.salesYear();

        return res.status(200).json(money);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let statisticalOrderStatus = async (req, res) => {
    try {
        let data = await dashboardService.statisticalOrderStatus();

        return res.status(200).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let saleMonthOfYear = async (req, res) => {
    try {
        let sale = await dashboardService.saleMonthOfYear();

        return res.status(200).json(sale);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let productsBestSeller = async (req, res) => {
    try {
        let products = await dashboardService.productsBestSeller();

        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(error);
    }
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