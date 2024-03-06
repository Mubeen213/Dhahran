
import express from "express";
import {createOrder} from "../controllers/OrderController.js";
import {authenticateUser} from "../middlewares/AuthenticateUser.js";
const orderRoutes = express.Router();

orderRoutes.route('/createOrder')
    .post(authenticateUser, createOrder)

export default orderRoutes;