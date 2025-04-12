const express = require('express');
const orderController = require('./../controllers/order.controller');
const router = express.Router();

const authUser = require('./../middlewares/auth.middleware');

//Customer
router.post('/calculate-shipping-fee', authUser.isLogin, orderController.calculateShippingFee);
router.post('/add-new-order', authUser.attachUser, orderController.addNewOrder);
router.get('/get-order-by-user', authUser.isLogin, orderController.getOrderByUserId);
router.get('/get-order-detail-by-code/:code', authUser.isLogin, orderController.getOrderDetailByCode);
router.get('/destroy-order/:id', authUser.isLogin, orderController.destroyOrder);

//Admin
router.get('/get-all-order', authUser.isAdmin, orderController.getAllOrders);
router.get('/get-order-detail-by-order/:id', authUser.isAdmin, orderController.getOrderDetailByOrder);
router.put('/change-status-order/:id', authUser.isAdmin, orderController.changeStatusOrder);
router.get('/filter', authUser.isAdmin, orderController.filter);

module.exports = router;
