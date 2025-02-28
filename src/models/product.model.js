const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
    option_value: { type: mongoose.Schema.Types.ObjectId, ref: "OptionValue", required: true }, // Tham chiếu đến OptionValue
    stock: { type: Number, default: 0 }
});

const ImageSchema = new mongoose.Schema({
    public_id: String,
    url: String
});

const ProductSchema = mongoose.Schema({
    p_name: String,
    p_code: String,
    p_slug: String,
    p_price: Number,
    p_promotion: Number,
    p_hot: { type: String, default: "false" },
    p_quantity: Number,
    p_status: { type: String, default: "Còn hàng" },
    p_datepublic: { type: String, default: null },
    p_images: [ImageSchema],
    p_description: { type: String, default: null },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
    variants: [VariantSchema],
    rating: { type: Number, default: 0 },
    number_of_rating: { type: Number, default: 0 },
    createdAt: { type: Date, default: new Date() }
});

ProductSchema.statics = {
    getAllProducts() {
        return this.find({})
            .populate('category')
            .populate('variants.option_value')
            .sort({ createdAt: -1 }).exec();
    },

    getByIdProduct(id) {
        return this.findById(id)
            .populate('category')
            .populate({
                path: 'variants.option_value',
                populate: {
                    path: 'option_id',
                    model: 'Option'
                }
            })
            .exec();
    },

    getManyBookInArray(arr) {
        return this.find({ '_id': { $in: arr } })
            .populate('category')
            .populate('variants.option_value')
            .exec();
    },

    addNewProduct(product) {
        return this.create(product);
    },

    getProductByCode(code) {
        return this.findOne({ p_code: { $regex: new RegExp(code, 'i') } }).exec();
    },

    getProductByCodeAndCheckExistsCode (id, code) {
        return this.findOne({ 
            $and: [
                { _id: { $ne: id } },
                { p_code: { $regex: new RegExp(code, 'i') } }
            ]
        }).exec();
    },

    deleteByIdProduct(productId) {
        return this.findByIdAndRemove(productId).exec();
    },

    findProductByCateId(id) {
        return this.find({ category: id }).exec();
    },

    findProductByCateIdAndDelete(id) {
        return this.deleteMany({ category: id }).exec();
    },

    updateFieldProductHotById(id, data) {
        return this.findByIdAndUpdate(id, { p_hot: data }).exec();
    },

    getNewBooks() {
        return this.find({}).sort({
            createdAt: -1
        })
            .populate('category')
            .populate('variants.option_value')
            .limit(7).exec();
    },

    getBooksHot() {
        return this.find({ p_hot: "true" }).sort({
            createdAt: -1
        })
            .populate('category')
            .populate('variants.option_value')
            .limit(7).exec();
    },

    updateProductById(id, data) {
        return this.findByIdAndUpdate(id, data).exec();
    },

    getBooksByCateId(cateId) {
        return this.find({ category: cateId })
            .populate('category')
            .populate('variants.option_value')
            .exec();
    },

    getBooksWithAuthor(authors) {

    },

    getBooksWithPrice(data) {
        return this.find(data)
            .populate('category')
            .populate('variants.option_value')
            .exec();
    },

    getBooksRelated(price, authors, cateId, currentBookId) {
        return this.find({
            $and: [
                { category: cateId },
                { $or: [
                    { p_price: price },
                    { author: { $in: authors } }
                ]},
                { _id: { $ne: currentBookId } }
            ]
        }).populate('category')
        .populate('options')
        .populate('variants.option_value').limit(10).exec();
    },

    //filter price
    getBookByPriceMax50(cateId) {
        return this.find({
            $and: [
                { 'category': cateId },
                { 'p_price': { $lt: 50000 } }
            ]
        })
            .populate('category')
            .populate('variants.option_value')
            .exec();
    },

    getBookByPriceFrom50to150(cateId) {
        return this.find({
            $and: [
                { 'category': cateId },
                { 'p_price': { $gte: 50000 } },
                { 'p_price': { $lte: 150000 } }
            ]
        })
            .populate('category')
            .populate('variants.option_value')
            .exec();
    },

    getBookByPriceMin150(cateId) {
        return this.find({
            $and: [
                { 'category': cateId },
                { 'p_price': { $gt: 150000 } }
            ]
        })
            .populate('category')
            .populate('variants.option_value')
            .exec();
    },

    countAllProducts() {
        return this.find({}).countDocuments();
    },

    searchBooks(query) {
        return this.find({
            $or: [
                { p_name: { $regex: query, $options: 'i' } },
                { p_description: { $regex: query, $options: 'i' } }
            ]
        })
            .populate('category')
            .populate('variants.option_value')
            .exec();
    }

}

module.exports = mongoose.model('Product', ProductSchema, 'product');
