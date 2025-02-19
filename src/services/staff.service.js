const userModel = require('./../models/user.model');
const bcrypt = require('bcrypt');

const saltRounds = 10; 

/**
 * get all staff
 * @returns json
 */
let getAllStaffs = async () => {
    let staffs = await userModel.getAllStaffs();

    return { message: 'SUCCESS', data: staffs };
}

let getStaffById = async (id) => {
    let staff = await userModel.findUserById(id);

    if (!staff) {
        return { message: 'USER_NOT_FOUND' };
    }

    return { message: 'SUCCESS', data: staff };
}

let addNewStaff = async (currUser, data) => {
    
    if (currUser.role === 'staff' || currUser.role === 'user' ) {
        return { message: 'NOT_PERMISSION' };
    }

    let checkUser = await userModel.findByEmail(data.email);

    if (checkUser) {
        return { message: 'EMAIL_EXISTS' };
    }

    let password = data.password;
    let salt = bcrypt.genSaltSync(saltRounds);
    let hashPassword = bcrypt.hashSync(password, salt);

    delete data.password;

    data = {
        ...data,
        password: hashPassword
    }

    await userModel.createNewUser(data);

    return { message: 'SUCCESS' };
}

let deleteStaffById = async (currUser, id) => {
    if (currUser.role !== 'admin') {
        return { message: 'NOT_PERMISSION' };
    }

    let staff = await userModel.findUserById(id);

    if (!staff) {
        return { message: 'USER_NOT_FOUND' };
    }

    if (currUser.role === staff.role) {
        return { message: 'ME' };
    }

    await userModel.deleteUser(id);

    return { message: 'SUCCESS' };
}

let updateStaffById = async (currUser, id, data) => {
    if (currUser.role !== 'admin') {
        return { message: 'NOT_PERMISSION' };
    }

    let staff = await userModel.findUserById(id);
    if (!staff) {
        return { message: 'USER_NOT_FOUND' };
    }

    await userModel.updateUserInfo(id, data);

    return { message: 'SUCCESS' };
}

module.exports = {
    getAllStaffs,
    getStaffById,
    addNewStaff,
    deleteStaffById,
    updateStaffById
}
