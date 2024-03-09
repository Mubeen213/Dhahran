

import mongoose from "mongoose";

const servicesSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, 'Please provide service name']
    },
    price: {
        type: Number,
        required: [true, 'Please provide price'],
    },
    description: {
        type: String,
        trim: true,
        maxLength: [700, 'Description cannot be more than 700 words']
    },
    image: {
        type: String,
        required: true
    },
    featured: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
})

const Service = mongoose.model('Service', servicesSchema);

export default Service