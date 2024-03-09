import express from "express";
import {authenticateUser, authorizePermissions} from "../middlewares/AuthenticateUser.js";
import {createBulkServiceItems, getServiceItemsByServiceId} from "../controllers/ServiceItemController.js";

const serviceItemRouter = express.Router()

serviceItemRouter.route('/createBulkServiceItems')
    .post(authenticateUser, authorizePermissions('admin'), createBulkServiceItems)

serviceItemRouter.route('/:id')
    .get(getServiceItemsByServiceId)

export default serviceItemRouter;