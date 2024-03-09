import express from "express";

const serviceRouter = express.Router()

import {
    createService, createServices, getAllServices, getFeaturedServices, getService
} from "../controllers/ServicesController.js";
import {authenticateUser, authorizePermissions} from "../middlewares/AuthenticateUser.js";

serviceRouter.route('/createService')
    .post(authenticateUser, authorizePermissions('admin'), createService)

serviceRouter.route('/createBulkServices')
    .post(authenticateUser, authorizePermissions('admin'), createServices)

serviceRouter.route('/featured')
    .get(getFeaturedServices)

serviceRouter.route('/')
    .get(getAllServices)

serviceRouter.route('/:id')
    .get(getService)


export default serviceRouter