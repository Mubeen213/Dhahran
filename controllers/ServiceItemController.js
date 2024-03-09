import ServiceItem from "../models/ServiceItem.js";
import {StatusCodes} from "http-status-codes";
import Service from "../models/Services.js";
import {BadRequest} from "../errors/BadRequest.js";


export const createBulkServiceItems = async (req, res) => {
    const {serviceItems} = req.body;

    if (!Array.isArray(serviceItems) || serviceItems.length === 0) {
        throw new BadRequest('Invalid or empty service items')
    }
    for (const item of serviceItems) {
        const {name, price, image, serviceName} = item;
        const dbService = await Service.findOne({name: serviceName});
        if (!dbService) {
            throw new BadRequest(`Service with naame ${name} does not exist`);
        }
        await ServiceItem.create({name, price, image, service: dbService._id});
    }

    res.status(StatusCodes.CREATED).json({msg: 'Inserted service items successfully'});
}

export const getServiceItemsByServiceId = async (req, res) => {

    const {id: serviceId} = req.params

    const serviceItems = await ServiceItem.find({service: serviceId})

    res.status(StatusCodes.OK)
        .json({
            'serviceItems': serviceItems
        })
}