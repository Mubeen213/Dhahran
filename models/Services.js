

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
        default: 0
    },
    description: {
        type: String,
        trim: true,
        maxLength: [700, 'Description cannot be more than 700 words']
    },
    featured: {
        type: Boolean,
        default: false
    }
})

const Service = mongoose.model('Service', servicesSchema);