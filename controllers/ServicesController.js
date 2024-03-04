import {StatusCodes} from "http-status-codes";
import Service from "../models/Services.js";
import {BadRequest} from "../errors/BadRequest.js";


export const createService = async (req, res) => {

    const {name, price, description, featured} = req.body
    const service = await Service.create({name, price, description, featured})
    return res.status(StatusCodes.CREATED)
        .json({
            'service': service
        })
}

export const getService = async (req, res) => {
    const {id} = req.param
    console.log("Get service")
    const service = await Service.findOne(id)
    return res.status(StatusCodes.OK)
        .json({
            'service': service
        })
}

export const getAllServices = async (req, res) => {

    const {search} = req.query
    const queryObject = {};
    if (search) {
        queryObject.name = {
            $regex: search,
            $options: 'i'
        };
    }

    const services = await Service.find(queryObject)
    return res.status(StatusCodes.OK)
        .json({
            'services': services
        })
}

export const getFeaturedServices = async (req, res) => {
    const featuredServices = await Service.find({featured: true})
    console.log("getFeaturedServices")
    return res.status(StatusCodes.OK)
        .json({
            'featured': featuredServices
        })
}