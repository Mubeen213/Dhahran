import User from "../models/User.js";
import {StatusCodes} from "http-status-codes";
import {validatePassword, hashPassword} from "../utils/PasswordUtils.js";
import {Unauthenticated} from "../errors/Unauthenticated.js";
import {BadRequest} from "../errors/BadRequest.js";
import {createTokenUser, setAuthCookiesToResponse} from "../utils/TokenUtils.js";
import {sendVerificationEmail} from "../utils/EmailUtils.js";
import * as crypto from "crypto";

export const login = async (req, res) => {
    const {email, password} = req.body;
    if (!email || !password) {
        throw new BadRequest('Please provide all values')
    }
    const user = await User.findOne({email})
    if (!user) {
        throw new Unauthenticated('User with this email does not exist')
    }
    const isPasswordCorrect = await validatePassword(password, user.password);
    if (!isPasswordCorrect) {
        throw new Unauthenticated('Email or password is incorrect')
    }
    if (!user.isVerified) {
        throw new Unauthenticated('Please verify your email')
    }
    const tokenUser = createTokenUser(user)
    setAuthCookiesToResponse({res, user: tokenUser})

    return res.status(StatusCodes.OK)
        .json({
            'user': tokenUser
        })
}

export const register = async (req, res) => {

    const {name, email, password, phoneNumber, dateOfBirth, creditCard} = req.body;
    if (!name || !email || !password) {
        throw new BadRequest("Please provide all values")
    }

    const emailAlreadyExists = await User.findOne({email})
    if (emailAlreadyExists) {
        throw new BadRequest('Email already exists')
    }

    if (creditCard.length !== 16) {
        throw new BadRequest('Please provide correct credit card details')
    }

    const isFirstAccount = await User.countDocuments(({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    const hashedPassword = await hashPassword(password)
    const hashedCreditCard = await hashPassword(creditCard);
    const verificationToken = crypto.randomBytes(20).toString('hex');
    let origin = "http://localhost:5173";
    const user = await User.create(
        {
            name,
            email,
            password: hashedPassword,
            role,
            phoneNumber,
            dateOfBirth,
            creditCard: hashedCreditCard,
            verificationToken
        })

    await sendVerificationEmail({
        name: user.name,
        email: user.email,
        verificationToken: user.verificationToken,
        origin
    })
    await sendVerificationEmail({
        name,
        email,
        verificationToken,
        origin
    })

    return res.status(StatusCodes.CREATED)
        .json({
            msg: 'Please verify your email'
        })
}

export const verifyEmail = async (req, res) => {

    const {token: verificationToken, email} = req.body
    const user = await User.findOne({email})
    console.log(req.body)
    if (!user) {
        throw new BadRequest(`User with email ${email} does not exist`)
    }
    if (verificationToken !== user.verificationToken) {
        throw new Unauthenticated('Invalid verification token')
    }
    user.verificationToken = ''
    user.isVerified = true
    user.verifiedOn = new Date();
    user.save();
    res.status(StatusCodes.OK)
        .json({
            msg: 'Email is verified'
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