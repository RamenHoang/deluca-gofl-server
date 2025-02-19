const mongoose = require('mongoose');

const CompanySchema = mongoose.Schema({
    c_name: String,
    c_code: String,
    c_info: { type: String, default: null},
    createdAt: { type: Date, default: new Date() }
});

CompanySchema.statics = {
    getAllCompanies() {
        return this.find({})
        .sort({ createdAt: -1 }).exec();
    },

    findCompanyByCode (code) {
        return this.findOne({ c_code: code }).exec();
    },

    addNewCompany (data) {
        return this.create(data);
    },

    deleteCompanyById (id) {
        return this.findByIdAndRemove(id).exec();
    },

    getCompanyById (id) {
        return this.findById(id).exec();
    },

    updateCompanyById (id, data) {
        return this.findByIdAndUpdate(id, data).exec();
    }
}

module.exports = mongoose.model('Company', CompanySchema, 'company');