const mongoose = require('mongoose');

const ImageSchema = mongoose.Schema({
    public_id: String,
    url: String,
}, {
    timestamps: true
});

module.exports = mongoose.model('Image', ImageSchema, 'images');
