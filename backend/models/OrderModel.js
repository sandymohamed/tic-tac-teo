const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    products: [{
        _id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true }
    }],

    totalPrice: {
        type: Number,
        required: true
    },

    shippingAddress: {
        address: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
        phone: { type: String, required: true },
    },
    paymentMethods: {
        type: String,
        required: true
    },
    paymentResult: {
        id: { type: String,  required: false, },
        status: { type: String,  required: false, },
        update_time: { type: String,  required: false, },
        email_address: { type: String,  required: false, },
       
    },

    taxPrice: {
        type: Number,
        default: 0.0,
        required: false,
    },

    shippingPrice: {
        type: Number,
        default: 0.0,
        required: false,
    },
    isPaid: {
        type: Boolean,
        default: false,
        require: true,

    },
    paidAt: {
        type: Date,
    },

    status: {
        type: String,
        enum: ['placed', 'shipped', 'delivered'],
        default: 'placed'
    },
    delieverdAt: {
        type: Date,
    },

}, { timestamps: true });

const OrderModel = mongoose.model('Order', orderSchema);

module.exports = OrderModel;
