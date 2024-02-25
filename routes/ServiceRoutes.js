
import express from "express";
const serviceRouter = express.Router()

import {
    createService
} from "../controllers/ServicesController.js";

serviceRouter.route('/createService')
        .post(createService)

export default serviceRouter