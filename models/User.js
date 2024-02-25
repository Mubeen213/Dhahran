import mongoose from "mongoose";
import validator from 'validator'

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide name'],
        minLength: 3,
        maxLength: 50
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minLength: [4, 'Password should be more than 4 letter']
    },
    location: {
        type: String,
        maxLength: [200, 'Address cannot be more than 200 words']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    }
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema);

export default User