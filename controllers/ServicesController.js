import {StatusCodes} from "http-status-codes";
import Service from "../models/Services.js";
import {BadRequest} from "../errors/BadRequest.js";


export const createService = async (req, res) => {

    const {name, price, description, featured} = req.body
    const service = await Service.create({name, price, description, featured})
    return res.status(StatusCodes.CREATED)
        .json({
            'Service': service
        })
}

export const getService = async (req, res) => {
    const {id} = req.param
    console.log("Get service")
    const service = await Service.findOne(id)
    return res.status(StatusCodes.OK)
        .json({
            'Service': service
        })
}

export const getAllServices = async (req, res) => {

    const services = await Service.find({})
    return res.status(StatusCodes.OK)
        .json({
            'Services': services
        })
}

export const getFeaturedServices = async (req, res) => {
    const featuredServices = await Service.find({featured: true})
    console.log("featured")
    return res.status(StatusCodes.OK)
        .json({
            'Featured': featuredServices
        })
}