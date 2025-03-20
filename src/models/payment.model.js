const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    qrCode: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Image",
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Payment', PaymentSchema, 'payment');
