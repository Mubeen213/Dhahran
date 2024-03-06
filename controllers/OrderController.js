import {BadRequest} from "../errors/BadRequest.js";
import Service from "../models/Services.js";
import {NotFound} from "../errors/NotFound.js";
import {Order} from "../models/Order.js";
import {StatusCodes} from "http-status-codes";


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