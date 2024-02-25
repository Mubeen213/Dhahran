import mongoose from "mongoose";

const SingleOrderItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    service: {
        type: mongoose.Schema.ObjectId,
        ref: 'Service',
        required: true
    }
})

const orderSchema = new mongoose.Schema({

    tax: {
        type: Number,
        required: true
    },
    shippingFee: {
        type: Number,
        required: require
    },
    subTotal: {
        type: Number,
        required: true
    },
    total: {
        type: Number,
        required: true
    },
    orderItems: [SingleOrderItemSchema],
    status: {
        type: String,
        enum: ['pending', 'picked-up', 'in-service', 'canceled', 'delivered'],
        default: 'pending'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    clientSecret: {
        type: String,
        required: true
    },
    paymentIntentId: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const Order = mongoose.model('Order', orderSchema);