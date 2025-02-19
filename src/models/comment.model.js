const mongoose = require('mongoose');

const CommentSchema = mongoose.Schema({
    c_content: String,
    c_rate: Number,
    book: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: new Date() }
});

CommentSchema.statics = {
    getAllComments() {
        return this.find({})
            .populate('user')
            .populate('book')
            .sort({
                createdAt: -1
            })
            .exec();
    },

    getCommentById(id) {
        return this.findById(id)
        .populate('user')
        .populate('book')
        .sort({
            createdAt: -1
        })
        .exec();
    },

    addNewComment(data) {
        return this.create(data);
    },

    getAllCommentsOfBook(bookId) {
        return this.find({ book: bookId })
            .populate('user')
            .populate('book')
            .sort({
                createdAt: -1
            })
            .exec();
    },

    rateAverageOfBook(bookId) {
        return this.aggregate([
            { $match: { book: mongoose.Types.ObjectId(bookId) } },
            { $group: { _id: '$book', average: { $avg: '$c_rate' } } }
        ]);
    },

    getBookIdWithRateStar(star, products) {
        return this.aggregate([
            { $group: { _id: '$book', average: { $avg: '$c_rate' } } },
            { $match: { average: { $gte: star }, '_id': { $in: products } } }
        ]).exec();
    },

    countCommentOfBook(bookId) {
        return this.find({ book: bookId }).countDocuments();
    },

    countCommentOfBookByRate(bookId, star) {
        return this.find({ book: bookId, c_rate: star }).countDocuments();
    },

    countAllRates() {
        return this.find({}).countDocuments();
    }
}



module.exports = mongoose.model('Comment', CommentSchema, 'comment');
