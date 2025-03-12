const mongoose = require('mongoose');

const ColorSchema = mongoose.Schema({
    name: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Color', ColorSchema, 'colors');
