const express = require('express');
const userController = require('./../controllers/user.controller');

const router = express.Router();

router.put('/update-password', userController.updatePassword);
router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.delete('/:id', userController.deleteUser);
router.put('/update-info/:id', userController.updateUserInfo);

module.exports = router;
