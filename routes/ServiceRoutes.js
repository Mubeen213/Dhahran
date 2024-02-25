
import express from "express";
const serviceRouter = express.Router()

import {
    createService, getAllServices, getFeaturedServices, getService
} from "../controllers/ServicesController.js";

serviceRouter.route('/createService')
        .post(createService)


serviceRouter.route('/featured')
    .get(getFeaturedServices)

serviceRouter.route('/')
    .get(getAllServices)

serviceRouter.route('/:id')
    .get(getService)



export default serviceRouter