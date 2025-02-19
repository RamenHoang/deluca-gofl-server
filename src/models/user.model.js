const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    username: String,
    gender: { type: String, default: 'male' },
    email: String,
    isActive: { type: Boolean, default: false },
    verifyToken: { type: String, default: null },
    avatar: { type: String, default: 'avatar.png' },
    password: String,
    role: { type: String, default: 'user' },
    address: { type: String, default: null },
    phone: { type: String, default: null },
    dateOfBirth: { type: String, default: null },
    createdAt: { type: Date, default: new Date() }
});

UserSchema.statics = {
    findUserById (id) {
        return this.findById(id, { password: 0, isActive: 0, verifyToken: 0, role: 0 }).exec();
    },

    findUserByIdGetPass (id) {
        return this.findById(id).exec();
    },

    findByEmail(email) {
        return this.findOne({ email: email }).exec();
    },

    createNewUser(userItem) {
        return this.create(userItem);
    },

    updatePasswordById(id, password) {
        return this.findByIdAndUpdate(id, { password: password }).exec();
    },

    updatePasswordByEmail(email, password) {
        return this.findOneAndUpdate({ email: email }, { password: password }).exec();
    },

    //user
    getAllUsers () {
        return this.find({ role: 'user' }, { password: 0 }).sort({ createdAt: -1 }).exec();
    },

    verify(token) {
        return this.findOneAndUpdate({verifyToken:token }, { isActive: true, verifyToken: null }).exec();
    },

    deleteUser (id) {
        return this.findByIdAndRemove(id).exec();
    },

    updateUserInfo(id, data) {
        return this.findByIdAndUpdate(id, data).exec();
    },

    countUserRegister () {
        return this.find({ role: 'user' }).countDocuments();
    },

    //Staff
    getAllStaffs () {
        return this.find({
            $or: [
                {role: 'admin'},
                {role: 'staff'}
            ]
        }, { password: 0 }).sort({ createdAt: -1 }).exec();
    }
}

UserSchema.methods = {
    comparePassword(password) {
        return bcrypt.compare(password, this.password);
    }
}

module.exports = mongoose.model('User', UserSchema, 'user');