const express = require('express');
const dashboardController = require('./../controllers/dashboard.controller');

const router = express.Router();

router.get('/count-all-orders', dashboardController.countAllOrders);
router.get('/count-new-orders', dashboardController.countNewOrders);
router.get('/count-user-register', dashboardController.countUserRegister);
router.get('/count-all-products', dashboardController.countAllProducts);
router.get('/count-all-rates', dashboardController.countAllRates);

//Doanh thu ban hang
router.get('/sales-day', dashboardController.salesDay);
router.get('/sales-month', dashboardController.salesMonth);
router.get('/sales-year', dashboardController.salesYear);

//Statistical
router.get('/statistical-order-status', dashboardController.statisticalOrderStatus);
router.get('/sale-month-of-year', dashboardController.saleMonthOfYear);
router.get('/products-best-seller', dashboardController.productsBestSeller);

module.exports = router;