import User from "../models/User.js";
import {StatusCodes} from "http-status-codes";
import {createTokenUser, setAuthCookiesToResponse} from "../utils/TokenUtils.js";
import {BadRequest} from "../errors/BadRequest.js";
import {Unauthenticated} from "../errors/Unauthenticated.js";
import {validatePassword} from "../utils/PasswordUtils.js";


export const getAllUsers = async (req, res) => {

    const users = await User.find({role: 'user'}).select('-password')
    return res.status(StatusCodes.OK)
        .json({
            'users': users
        })
}

export const getCurrentUser = async (req, res) => {
    const userId = req.user.userId;
    const user = await User.findOne({_id: userId}).select('-password')
    console.log("Current user" + user)
    res.status(StatusCodes.OK)
        .json({
            'user': user
        })
}

export const getSingleUser = async (req, res) => {

    const user = await User.findOne({_id: req.params.id}).select('-password')

    res.status(StatusCodes.OK)
        .json({
            'user': user
        })
}

export const updateUser = async (req, res) => {

    const {name, email, location} = req.body;
    if (!name || !email) {
        return res.status(400).json({error: 'Missing required information'});
    }

    const user = await User.findOne({_id: req.user.userId});

    user.email = email;
    user.name = name;
    user.location = location

    await user.save();

    const tokenUser = createTokenUser(user);
    setAuthCookiesToResponse({res, user: tokenUser});
    res.status(StatusCodes.OK).json({user: tokenUser});
}

export const updatePassword = async (req, res) => {
    const {email, oldPassword, newPassword} = req.body;
    const user = await User.findOne({email})
    if (!user) {
        throw new BadRequest('User does not exist')
    }

    if (!oldPassword || !newPassword) {
        throw new BadRequest('Please provide password')
    }
    const isPasswordCorrect = await validatePassword(oldPassword, user.password)

    if (!isPasswordCorrect) {
        throw new Unauthenticated('Invalid credentials')
    }

    user.password = newPassword;
    user.save();

    res.status(StatusCodes.OK)
        .json({
            msg: 'Password updated successfully'
        })
}