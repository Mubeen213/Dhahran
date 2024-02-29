import User from "../models/User.js";
import {StatusCodes} from "http-status-codes";


export const getAllUsers = async (req, res) => {

    const users = User.find({})

    return res.status(StatusCodes.OK)
        .json({
            'users': users
        })
}