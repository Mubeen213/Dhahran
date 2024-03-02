import User from "../models/User.js";
import {StatusCodes} from "http-status-codes";
import {validatePassword, hashPassword} from "../utils/PasswordUtils.js";
import {Unauthenticated} from "../errors/Unauthenticated.js";
import {BadRequest} from "../errors/BadRequest.js";
import {createTokenUser, setAuthCookiesToResponse} from "../utils/TokenUtils.js";

export const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if (!user) {
        throw new Unauthenticated('User with this email does not exist')
    }
    const isPasswordCorrect = await validatePassword(password, user.password);
    if (!isPasswordCorrect) {
        throw new Unauthenticated('Email or password is incorrect')
    }
    const tokenUser = createTokenUser(user)
    setAuthCookiesToResponse({res, user: tokenUser})

    return res.status(StatusCodes.OK)
        .json({
            'User': tokenUser
        })
}

export const register = async (req, res) => {

    const {name, email, password} = req.body;

    const emailAlreadyExists = await User.findOne({email})
    if (emailAlreadyExists) {
        throw new BadRequest('Email already exists')
    }

    const isFirstAccount = await User.countDocuments(({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    const hashedPassword = await hashPassword(password)
    console.log("Hashed password  " + hashedPassword)
    const user = await User.create({name, email, password: hashedPassword, role})
    const tokenUser = createTokenUser(user)
    setAuthCookiesToResponse({res, user: tokenUser})

    return res.status(StatusCodes.CREATED)
        .json({
            'User': tokenUser
        })
}

export const logout = async (req, res) => {

    res.cookie('token', 'logout', {
        httpOnly: true,
        expires: new Date(Date.now() + 1000)
    })

    res.status(StatusCodes.OK)
        .json({
            msg: 'User logged out'
        })
}