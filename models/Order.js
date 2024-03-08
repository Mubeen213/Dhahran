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
        required: true
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
        enum: ['pending', 'picked-up', 'in-service', 'cancelled', 'delivered'],
        default: 'pending'
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    address: {
        type: String,
        required: true
    },
    pickUpDate: {
        type: Date,
        required: true
    },
    deliveryDate: {
        type: Date,
        required: true
    },
    cardDetails: {
        type: String,
        required: true,
        select: false
    },
    clientSecret: {
        type: String,
    },
    paymentIntentId: {
        type: String,
    }
}, {
    timestamps: true
})

export const Order = mongoose.model('Order', orderSchema);