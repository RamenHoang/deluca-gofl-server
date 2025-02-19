const userService = require('./../services/user.service');

let updatePassword = async (req, res) => {
    try {
        let data = req.body;

        let updatePassword = await userService.updatePassword(data);

        return res.status(200).json(updatePassword);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let getAllUsers = async (req, res) => {
    try {
        let allUsers = await userService.getAllUsers();

        return res.status(200).json(allUsers);
    } catch (error) {   
        return res.status(500).json(error);
    }
}

let getUserById = async (req, res) => {
    try {
        let id = req.params.id;
        let user = await userService.getUserById(id);
        
        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let deleteUser = async (req, res) => {
    try {
        let id = req.params.id;
        let currUser = req.user;
        let deleteUser = await userService.deleteUser(currUser, id);

        return res.status(200).json(deleteUser);
    } catch (error) {
        return res.status(500).json(error);
    }
}

let updateUserInfo = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;

        let updateInfoUser = await userService.updateUserInfo(id, data);

        return res.status(200).json(updateInfoUser);
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = {
    updatePassword,
    getAllUsers,
    getUserById,
    deleteUser,
    updateUserInfo
}
