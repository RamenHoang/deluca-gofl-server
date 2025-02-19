const bcrypt = require('bcrypt');
const userModel = require('./../models/user.model');

const saltRounds = 10; 

/**
 * Replace password
 * @param {json} data 
 */
let updatePassword = async (data) => {
    let userId = data.id;

    let user = await userModel.findUserByIdGetPass(userId);

    if (!user) {
        return { message: 'USER_NOT_FOUND' };
    }

    let comparePass = await user.comparePassword(data.oldPassword);

    if (!comparePass) {
        return { message: 'PASSWORD_IS_WRONG' };
    }

    let salt = bcrypt.genSaltSync(saltRounds);

    await userModel.updatePasswordById(data.id, bcrypt.hashSync(data.newPassword, salt));

    return { message: 'SUCCESS' };
}

/**
 * Get all users from database
 */
let getAllUsers = async () => {

    let allUser = await userModel.getAllUsers();

    return { message: 'SUCCESS', data: allUser };
} 

let getUserById = async (id) => {
    let user = await userModel.findUserById(id);

    if (!user) {
        return { message: 'USER_NOT_FOUND' };
    }

    return { message: 'SUCCESS', data: user };
}

let deleteUser = async (currUser, id) => {
   if (currUser.role === 'user') {
       return { message: 'NOT_PERMISSION' };
   }

   let customer = await userModel.findUserById(id);

   if (!customer) {
       return { message: 'USER_NOT_FOUND' };
   }

   await userModel.deleteUser(id);

   return { message: 'SUCCESS' };
}

let updateUserInfo = async (id, data) => {
    let currentUser = await userModel.findUserById(id);

    if (!currentUser) {
        return { message: 'USER_NOT_FOUND' };
    }

    await userModel.updateUserInfo(id, data);

    return { message: 'SUCCESS' };
}

module.exports = {
    updatePassword,
    getAllUsers,
    getUserById,
    deleteUser,
    updateUserInfo
}
