import mongoose from "mongoose";
import validator from 'validator';
import bcrypt from "bcryptjs";

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
    phoneNumber: {
        type: Number,
        required: true
    },
    dateOfBirth: {
        type: Date,
        required: false
    },
    creditCard: {
        type: String,
        required: true
    },
    location: {
        type: String,
        maxLength: [200, 'Address cannot be more than 200 words']
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    verificationToken: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    verifiedOn: {
        type: Date
    }
}, {
    timestamps: true
})

userSchema.methods.comparePassword = async function (password) {
    const isMatch = await bcrypt.compare(password, this.password)
    return isMatch;
}

const User = mongoose.model('User', userSchema);

export default User