const mongoose = require('mongoose');

const BannerSchema = mongoose.Schema({
    b_name: String,
    b_image: { public_id: String, url: String },
}, {
    timestamps: true
});

BannerSchema.statics = {
    getAllBanners() {
        return this.find({}).sort({ createdAt: -1 }).exec();
    },

    addNewBanner(data) {
        return this.create(data);
    },

    findBannerById(id) {
        return this.findById(id).exec();
    },

    deleteBannerById(id) {
        return this.findByIdAndRemove(id).exec();
    },

    updateBannerById(id, data) {
        return this.findByIdAndUpdate(id, data).exec();
    },

    getBanners() {
        return this.find({}).sort({ createdAt: -1 }).limit(5).exec();
    }
}

module.exports = mongoose.model('Banner', BannerSchema, 'banner');
