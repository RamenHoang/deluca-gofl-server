const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    featuredImage: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
        required: true
    },
    published: {
        type: Boolean,
        default: false
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
}, {
    timestamps: true
});

module.exports = mongoose.model('Post', PostSchema, 'post');
