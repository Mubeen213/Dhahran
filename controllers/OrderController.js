import {BadRequest} from "../errors/BadRequest.js";
import Service from "../models/Services.js";
import {NotFound} from "../errors/NotFound.js";
import {Order} from "../models/Order.js";
import {StatusCodes} from "http-status-codes";
import {Unauthorized} from "../errors/Unauthorized.js";


export const createOrder = async (req, res) => {

    const {cartItems, address, tax, shippingFee, orderTotal} = req.body

    if (!cartItems || cartItems.length < 1) {
        throw new BadRequest('No cart items provided')
    }
    if (!tax || !shippingFee) {
        throw new BadRequest('No tax or Shipping fee was provided')
    }
    let orderItems = [];
    let subTotal = 0;
    for (const item of cartItems) {
        const dbService = await Service.findOne({_id: item.cartID})
        if (!dbService) {
            throw new NotFound(`Service with id: ${item.cartID} does not exist`)
        }
        const {name, price, _id} = dbService;
        const singleOrderItem = {
            amount: item.amount,
            name,
            price,
            service: _id
        }
        orderItems = [...orderItems, singleOrderItem]
        subTotal += item.amount * price
    }

    const total = tax + shippingFee + subTotal;

    const order = await Order.create({
        orderItems,
        total,
        shippingFee,
        subTotal,
        tax,
        user: req.user.userId,
        address
    })

    res.status(StatusCodes.CREATED)
        .json({
            msg: 'Order placed successfully'
        })
}

export const getCurrentUserOrder = async (req, res) => {
    const orders = await Order.find({user: req.user.userId})
    return res.status(StatusCodes.OK)
        .json({
            'orders': orders
        })
}

export const getSingleOrder = async (req, res) => {

    const {id: orderId} = req.params

    const order = await Order.findOne({_id: orderId})
    if (req.user.userId !== order.user) {
        throw new Unauthorized('User is not allowed to access')
    }

    if (!order) {
        throw new BadRequest(`Order with ${orderId} does not exist`);
    }

    return res.status(StatusCodes.OK)
        .json({
            'order': order
        })
}

export const getAllOrders = async (req, res) => {

    const orders = await Order.find({})

    res.status(StatusCodes.OK)
        .json({
            'orders': orders
        })

}

export const updateOrderStatus = async (req, res) => {

    const {orderId, orderStatus} = req.body
    const validStatusValues = ['pending', 'picked-up', 'in-service', 'cancelled', 'delivered'];

    if (!validStatusValues.includes(orderStatus)) {
        throw new BadRequest('Not a valid status')
    }

    const updatedOrder = await Order.findOneAndUpdate({_id: orderId, status: orderStatus}, {
        new: true
    })

    if (!updatedOrder) {
        throw new BadRequest(`Order with id ${orderId} does not exist`)
    }

    res.status(StatusCodes.OK)
        .json({
            'order': updatedOrder
        })
}