const mongoose = require('mongoose');

const SizeSchema = mongoose.Schema({
    name: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Size', SizeSchema, 'sizes');
