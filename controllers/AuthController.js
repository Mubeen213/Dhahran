import User from "../models/User.js";
import {StatusCodes} from "http-status-codes";
import bcrypt from 'bcryptjs'
import {hasPassword} from "../utils/PasswordUtils.js";

export const login = async (req, res) => {
    console.log("Logged in")
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