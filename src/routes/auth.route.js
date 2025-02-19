const express = require('express');
const authController = require('./../controllers/auth.controller');

const router = express.Router();

router.post('/login', authController.login); //Admin đăng nhập (sẽ tách sau)

router.post('/user-login', authController.userLogin); //Khách hàng thường đăng nhập
router.post('/user-login-with-facebook', authController.userLoginWithFacebook);
router.post('/user-login-with-google', authController.userLoginWithGoogle);
router.post('/forgot-password', authController.forgotPassword);
router.post('/register', authController.register);
router.get('/verify/:token', authController.verifyEmail);

module.exports = router;
