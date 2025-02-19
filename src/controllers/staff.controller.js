const staffService = require('./../services/staff.service');

let getAllStaffs = async (req, res) => {
    try {
        let staffs = await staffService.getAllStaffs();

        return res.status(200).json(staffs);
    } catch (error) {  
        return res.status(500).json(error);
    }
}

let getStaffById = async (req, res) => {
    try {
        let id = req.params.id;
        let staff = await staffService.getStaffById(id);

        return res.status(200).json(staff);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let addNewStaff = async (req, res) => {
    try {
        let data = req.body;
        let newStaff = await staffService.addNewStaff(req.user, data);

        return res.status(200).json(newStaff);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let deleteStaffById = async (req, res) => {
    try {
        let id = req.params.id;
        let deleteStaff = await staffService.deleteStaffById(req.user, id);

        return res.status(200).json(deleteStaff);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let updateStaffById = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let staff = await staffService.updateStaffById(req.user, id, data);

        return res.status(200).json(staff);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    getAllStaffs,
    getStaffById,
    addNewStaff,
    deleteStaffById,
    updateStaffById
}
