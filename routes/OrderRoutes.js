import express from "express";
import {
    createOrder,
    getAllOrders,
    getCurrentUserOrder,
    getSingleOrder,
    updateOrderStatus
} from "../controllers/OrderController.js";
import {authenticateUser, authorizePermissions} from "../middlewares/AuthenticateUser.js";

const orderRoutes = express.Router();

orderRoutes.route('/createOrder')
    .post(authenticateUser, createOrder)

orderRoutes.route('/')
    .get(authenticateUser, authorizePermissions('admin'), getAllOrders)

orderRoutes.route('/userOrders')
    .get(authenticateUser, getCurrentUserOrder)

orderRoutes.route('/updateOrderStatus')
    .post(authenticateUser, updateOrderStatus)

orderRoutes.route('/:id')
    .get(getSingleOrder)

export default orderRoutes;