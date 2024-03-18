import User from "../models/User.js";
import {StatusCodes} from "http-status-codes";
import {validatePassword, hashPassword} from "../utils/PasswordUtils.js";
import {Unauthenticated} from "../errors/Unauthenticated.js";
import {BadRequest} from "../errors/BadRequest.js";
import {createTokenUser, setAuthCookiesToResponse} from "../utils/TokenUtils.js";
import axios from "axios";
import * as querystring from "querystring";

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

    if (password.length < 8) {
        throw new BadRequest('Password should be at least 8 letters')
    }

    if (creditCard.length !== 16) {
        throw new BadRequest('Please provide correct credit card details')
    }

    const isFirstAccount = await User.countDocuments(({})) === 0;
    const role = isFirstAccount ? 'admin' : 'user';

    const hashedPassword = await hashPassword(password)
    const hashedCreditCard = await hashPassword(creditCard);
    const user = await User.create(
        {
            name,
            email,
            password: hashedPassword,
            role,
            phoneNumber,
            dateOfBirth,
            creditCard: hashedCreditCard
        })
    const tokenUser = createTokenUser(user)
    setAuthCookiesToResponse({res, user: tokenUser})

    return res.status(StatusCodes.CREATED)
        .json({
            'user': tokenUser
        })
}

export const getOauthAppDetails = async (req, res) => {
    res.status(StatusCodes.OK)
        .json({
            oauthAppDetails: {
                GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
                REDIRECT_URL: process.env.REDIRECT_URL,
                AUTHORIZATION_URL: process.env.AUTHORIZATION_URL,
                SCOPE: process.env.SCOPE
            }
        });
}

export const handleGoogleCallbackAndExchangeCodes = async (req, res) => {

    const {code} = req.query
    const requestBody = {
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CILENT_SECRET,
        redirect_uri: process.env.REDIRECT_URL,
        grant_type: 'authorization_code'
    }

    const tokenResponse = await axios.post(process.env.TOKEN_URL,
        querystring.stringify(requestBody), {
            headers: {
                'Content-type': 'application/x-www-form-urlencoded'
            }
        })
    const accessToken = tokenResponse.data.access_token;

    // Use the access token to fetch user information
    const userInfoUrl = 'https://openidconnect.googleapis.com/v1/userinfo';
    const userInfoResponse = await axios.get(userInfoUrl, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });

    const userData = userInfoResponse.data;
    const {name, email} = userData
    let user;
    const existingUser = await User.findOne({email: email})
    if (!existingUser) {
        user = await User.create({
            name,
            email
        })
    } else {
        user = existingUser;
    }
    const tokenUser = createTokenUser(user)
    setAuthCookiesToResponse({res, user: tokenUser})
    res.status(StatusCodes.OK)
        .json({
            'user': tokenUser
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