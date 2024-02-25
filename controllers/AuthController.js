import User from "../models/User.js";
import {StatusCodes} from "http-status-codes";
import bcrypt from 'bcryptjs'
import {comparePassword, hasPassword} from "../utils/PasswordUtils.js";
import {Unauthenticated} from "../errors/Unauthenticated.js";
import {Unauthorized} from "../errors/Unauthorized.js";

export const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(!user) {
        throw new Unauthenticated('User with this email does not exist')
    }
    const isPasswordCorrect = await comparePassword(password, user.password);
    if(!isPasswordCorrect) {
        throw new Unauthenticated('Email or password is incorrect')
    }
    res.send("Login route")
}

export const register = async (req, res) => {

    const salt = await bcrypt.genSalt(10)
    req.body.password = await hasPassword(req.body.password)
    const user = await User.create(req.body)
    return res.status(StatusCodes.CREATED)
        .json({
            'User': user
        })
}