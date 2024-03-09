import {StatusCodes} from "http-status-codes";
import Service from "../models/Services.js";


export const createService = async (req, res) => {

    const {name, price, description, featured} = req.body
    const service = await Service.create({name, price, description, featured})
    return res.status(StatusCodes.CREATED)
        .json({
            'service': service
        })
}

export const createServices = async (req, res) => {

    const {services} = req.body
    console.log(services)
    const createdServices = await Service.insertMany(services);
    res.status(StatusCodes.CREATED).json({
        msg: "Created services"
    })
}

export const getService = async (req, res) => {
    const {id} = req.params
    console.log("Get service with id  " + id)
    const service = await Service.findOne({_id: id})
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