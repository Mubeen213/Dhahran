import mongoose from "mongoose";


const serviceItemSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide service item name']
    },
    price: {
        type: Number,
        required: [true, 'Please provide price'],
    },
    image: {
        type: String,
        required: true
    },
    service: {
        type: mongoose.Schema.ObjectId,
        ref: 'Service',
        required: true
    }
}, {
    timestamps: true
})

const ServiceItem = mongoose.model('ServiceItem', serviceItemSchema);

export default ServiceItem;