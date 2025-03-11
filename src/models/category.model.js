const mongoose = require('mongoose');

const CategorySchema = mongoose.Schema({
    c_name: String,
    c_slug: String,
    c_parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    order: { type: Number, default: 0 },
    c_description: { type: String, default: null },
    createdAt: { type: Date, default: new Date() }
});

CategorySchema.statics = {
    findByName(c_name) {
        return this.findOne({ c_name: c_name }).exec();
    },

    addNewCategory(dataCate) {
        return this.create(dataCate);
    },

    getAllCategory() {
        return this.find({})
        .populate('c_parent')
        .sort({
            order: 1,
            createdAt: -1
        })
        .exec();
    },

    getByIdCategory (id) {
        return this.findById(id).populate('c_parent').exec();
    },

    deleteByIdCategory (id) {
        return this.findByIdAndRemove(id).exec();
    },

    updateCategory (id, itemCate) {
        return this.findByIdAndUpdate(id, itemCate).exec();
    },

    countCateChildByParentId(id) {
        return this.countDocuments({ c_parent: id });
    }
};

module.exports = mongoose.model('Category', CategorySchema, 'category');
