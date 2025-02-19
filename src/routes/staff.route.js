const express = require('express');
const staffController = require('./../controllers/staff.controller');

const router = express.Router();

router.get('/', staffController.getAllStaffs);
router.post('/', staffController.addNewStaff);
router.delete('/:id', staffController.deleteStaffById);
router.get('/:id', staffController.getStaffById);
router.put('/:id', staffController.updateStaffById);

module.exports = router;