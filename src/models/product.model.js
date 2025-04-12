const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const categoryModel = require('./category.model');

const ProductSchema = mongoose.Schema({
    p_name: String,
    p_code: String,
    p_slug: String,
    p_price: Number,
    p_promotion: Number,
    p_hot: { type: String, default: "false" },
    p_status: { type: String, default: "Còn hàng" },
    p_datepublic: { type: String, default: null },
    p_description: { type: String, default: null },
    category: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    variants: [
        {
            color: { type: mongoose.Schema.Types.ObjectId, ref: "Color", required: true },
            images: [{ type: mongoose.Schema.Types.ObjectId, ref: "Image", required: true }],
            sizes: [
                {
                    size: { type: mongoose.Schema.Types.ObjectId, ref: "Size", required: true },
                    stock: { type: Number, required: true },
                }
            ]
        }
    ],
    rating: { type: Number, default: 0 },
    number_of_rating: { type: Number, default: 0 },
    sizeChart: { type: mongoose.Schema.Types.ObjectId, ref: "Image", required: true }
}, {
    timestamps: true
});

ProductSchema.statics = {
    getAllProducts() {
        return this.find({})
            .populate('category')
            .populate({
                path: 'variants.color',
                model: 'Color'
            })
            .populate({
                path: 'variants.images',
                model: 'Image'
            })
            .populate({
                path: 'variants.sizes.size',
                model: 'Size'
            })
            .sort({ createdAt: -1 }).exec();
    },

    getByIdProduct(id) {
        return this.findById(id)
            .populate('category')
            .populate({
                path: 'variants.color',
                model: 'Color'
            })
            .populate({
                path: 'variants.images',
                model: 'Image'
            })
            .populate({
                path: 'variants.sizes.size',
                model: 'Size'
            })
            .populate('sizeChart')
            .exec();
    },

    getManyBookInArray(arr) {
        return this.find({ '_id': { $in: arr } })
            .populate('category')
            .populate({
                path: 'variants.color',
                model: 'Color'
            })
            .populate({
                path: 'variants.images',
                model: 'Image'
            })
            .populate({
                path: 'variants.sizes.size',
                model: 'Size'
            })
            .exec();
    },

    addNewProduct(product) {
        return this.create(product);
    },

    getProductByCode(code) {
        return this.findOne({ p_code: { $regex: new RegExp(code, 'i') } }).exec();
    },

    getProductByCodeAndCheckExistsCode(id, code) {
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

    getNewBooks(page) {
        const limit = 8;

        if (page === undefined || page < 1) {
            page = 1;
        }
        const skip = (page - 1) * limit;

        return this.find({})
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate('category')
            .populate({
                path: 'variants.color',
                model: 'Color'
            })
            .populate({
                path: 'variants.images',
                model: 'Image'
            })
            .populate({
                path: 'variants.sizes.size',
                model: 'Size'
            })
            .exec();
    },

    getBooksHot() {
        return this.find({ p_hot: "true" }).sort({
            createdAt: -1
        })
            .populate('category')
            .populate({
                path: 'variants.color',
                model: 'Color'
            })
            .populate({
                path: 'variants.images',
                model: 'Image'
            })
            .populate({
                path: 'variants.sizes.size',
                model: 'Size'
            })
            .limit(7).exec();
    },

    updateProductById(id, data) {
        return this.findByIdAndUpdate(id, data).exec();
    },

    getBooksByCateId(cateId, minPrice, maxPrice) {
        let query = { category: cateId };
        if (minPrice !== undefined && maxPrice !== undefined) {
            query.$or = [
                { p_price: { $gte: minPrice, $lte: maxPrice } },
                { p_promotion: { $gte: minPrice, $lte: maxPrice } }
            ];
        }
        return this.find(query)
            .populate('category')
            .populate({
                path: 'variants.color',
                model: 'Color'
            })
            .populate({
                path: 'variants.images',
                model: 'Image'
            })
            .populate({
                path: 'variants.sizes.size',
                model: 'Size'
            })
            .exec();
    },

    async getBooksByCateIds(cateIds, minPrice, maxPrice, page, limit) {
        const category = await categoryModel.find({ _id: { $in: cateIds } }).exec();
        cateIds = category.map(cate => ObjectId(cate._id));

        // Check if any category has isDiscount set to true
        const hasDiscount = category.some(cate => cate.isDiscount === true);


        if (limit === undefined || limit < 1) {
            limit = 6;
        }

        if (page === undefined || page < 1) {
            page = 1;
        }
        const skip = (page - 1) * limit;

        let query = {};

        if (hasDiscount) {
            query.p_promotion = { $ne: null, $gt: 0 };
            query.$expr = {
                $lt: [
                  { $cond: [
                    { $eq: ["$p_price", 0] }, 
                    0, 
                    { $divide: ["$p_promotion", "$p_price"] }
                  ]},
                  0.5
                ]
              }

            if (minPrice !== undefined && maxPrice !== undefined) {
                query.p_promotion.$gte = minPrice;
                query.p_promotion.$lte = maxPrice;
            }
        } else {
            if (cateIds.length > 0 && cateIds[0] !== '') {
                query.category = { $in: cateIds };
            }
            if (minPrice !== undefined && maxPrice !== undefined) {
                query.$or = [
                    { p_price: { $gte: minPrice, $lte: maxPrice } },
                    { p_promotion: { $gte: minPrice, $lte: maxPrice } }
                ];
            }
        }

        return this.find(query)
            .populate('category')
            .populate({
                path: 'variants.color',
                model: 'Color'
            })
            .populate({
                path: 'variants.images',
                model: 'Image'
            })
            .populate({
                path: 'variants.sizes.size',
                model: 'Size'
            })
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .exec();
    },

    getBooksWithAuthor(authors) {

    },

    getBooksWithPrice(data) {
        return this.find(data)
            .populate('category')
            .populate({
                path: 'variants.color',
                model: 'Color'
            })
            .populate({
                path: 'variants.images',
                model: 'Image'
            })
            .populate({
                path: 'variants.sizes.size',
                model: 'Size'
            })
            .exec();
    },

    getBooksRelated(price, cateId, currentBookId) {
        return this.find({
            $and: [
                { category: cateId },
                {
                    $or: [
                        { p_price: price },
                    ]
                },
                { _id: { $ne: currentBookId } }
            ]
        }).populate('category')
            .populate('options')
            .populate({
                path: 'variants.color',
                model: 'Color'
            })
            .populate({
                path: 'variants.images',
                model: 'Image'
            })
            .populate({
                path: 'variants.sizes.size',
                model: 'Size'
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
                path: 'variants.color',
                model: 'Color'
            })
            .populate({
                path: 'variants.images',
                model: 'Image'
            })
            .populate({
                path: 'variants.sizes.size',
                model: 'Size'
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
                path: 'variants.color',
                model: 'Color'
            })
            .populate({
                path: 'variants.images',
                model: 'Image'
            })
            .populate({
                path: 'variants.sizes.size',
                model: 'Size'
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
                path: 'variants.color',
                model: 'Color'
            })
            .populate({
                path: 'variants.images',
                model: 'Image'
            })
            .populate({
                path: 'variants.sizes.size',
                model: 'Size'
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
                path: 'variants.color',
                model: 'Color'
            })
            .populate({
                path: 'variants.images',
                model: 'Image'
            })
            .populate({
                path: 'variants.sizes.size',
                model: 'Size'
            })
            .exec();
    },

    getDiscountProducts(page) {
        const limit = 8;

        if (page === undefined || page < 1) {
            page = 1;
        }

        const skip = (page - 1) * limit;

        return this.find({ p_promotion: { $gt: 0 }, p_hot: "true" })
            .skip(skip)
            .limit(limit)
            .populate('category')
            .populate({
                path: 'variants.color',
                model: 'Color'
            })
            .populate({
                path: 'variants.images',
                model: 'Image'
            })
            .populate({
                path: 'variants.sizes.size',
                model: 'Size'
            })
            .exec();
    },

    migrateToMultipleCategories() {
        // Find all products where category exists but is not an array
        return this.aggregate([
            {
                $match: {
                    category: { $exists: true },
                    $expr: { $not: { $isArray: "$category" } }
                }
            }
        ]).then(products => {
            if (products.length === 0) {
                return { message: "No products found that need migration", migratedCount: 0 };
            }
            
            const updatePromises = products.map(product => {
                return this.updateOne(
                    { _id: product._id },
                    { $set: { category: [product.category] } }
                );
            });
            
            return Promise.all(updatePromises).then(() => {
                return { 
                    message: "Migration completed successfully", 
                    migratedCount: products.length,
                    migratedProducts: products.map(p => p._id)
                };
            });
        });
    }
}

module.exports = mongoose.model('Product', ProductSchema, 'product');
