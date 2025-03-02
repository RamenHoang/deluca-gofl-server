const mongoose = require('mongoose');

const ImageSchema = new mongoose.Schema({
    public_id: String,
    url: String
});

const VariantSchema = new mongoose.Schema({
    option_values: [{ type: mongoose.Schema.Types.ObjectId, ref: "OptionValue", required: true }], // Tham chiếu đến OptionValue
    stock: { type: Number, default: 0 },
    image: { type: ImageSchema, default: null }
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
            .populate({
                path: 'variants.option_values',
                populate: {
                    path: 'option',
                    model: 'Option'
                }
            })
            .sort({ createdAt: -1 }).exec();
    },

    getByIdProduct(id) {
        return this.findById(id)
            .populate('category')
            .populate({
                path: 'variants.option_values',
                populate: {
                    path: 'option',
                    model: 'Option'
                }
            })
            .exec();
    },

    getManyBookInArray(arr) {
        return this.find({ '_id': { $in: arr } })
            .populate('category')
            .populate({
                path: 'variants.option_values',
                populate: {
                    path: 'option',
                    model: 'Option'
                }
            })
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
                { p_code: code }
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
            .populate({
                path: 'variants.option_values',
                populate: {
                    path: 'option',
                    model: 'Option'
                }
            })
            .limit(7).exec();
    },

    getBooksHot() {
        return this.find({ p_hot: "true" }).sort({
            createdAt: -1
        })
            .populate('category')
            .populate({
                path: 'variants.option_values',
                populate: {
                    path: 'option',
                    model: 'Option'
                }
            })
            .limit(7).exec();
    },

    updateProductById(id, data) {
        return this.findByIdAndUpdate(id, data).exec();
    },

    getBooksByCateId(cateId) {
        return this.find({ category: cateId })
            .populate('category')
            .populate({
                path: 'variants.option_values',
                populate: {
                    path: 'option',
                    model: 'Option'
                }
            })
            .exec();
    },

    getBooksWithAuthor(authors) {

    },

    getBooksWithPrice(data) {
        return this.find(data)
            .populate('category')
            .populate({
                path: 'variants.option_values',
                populate: {
                    path: 'option',
                    model: 'Option'
                }
            })
            .exec();
    },

    getBooksRelated(price, cateId, currentBookId) {
        return this.find({
            $and: [
                { category: cateId },
                { $or: [
                    { p_price: price },
                ]},
                { _id: { $ne: currentBookId } }
            ]
        }).populate('category')
        .populate('options')
        .populate({
            path: 'variants.option_values',
            populate: {
                path: 'option',
                model: 'Option'
            }
        }).limit(4).exec();
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
            .populate({
                path: 'variants.option_values',
                populate: {
                    path: 'option',
                    model: 'Option'
                }
            })
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
            .populate({
                path: 'variants.option_values',
                populate: {
                    path: 'option',
                    model: 'Option'
                }
            })
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
            .populate({
                path: 'variants.option_values',
                populate: {
                    path: 'option',
                    model: 'Option'
                }
            })
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
            .populate({
                path: 'variants.option_values',
                populate: {
                    path: 'option',
                    model: 'Option'
                }
            })
            .exec();
    },

    getDiscountProducts() {
        return this.find({ p_promotion: { $gt: 0 } })
            .populate('category')
            .populate({
                path: 'variants.option_values',
                populate: {
                    path: 'option',
                    model: 'Option'
                }
            })
            .exec();
    }

}

module.exports = mongoose.model('Product', ProductSchema, 'product');
