import express from 'express'
import Order from '../models/orderModel.js'

import { isAuth } from '../utils.js'

const orderRoutes = express.Router()


//fetching all the products
orderRoutes.post('/', isAuth, async (req, res, next) => {

    try {
        const newOrder = new Order({
            orderItems:req.body.orderItems.map((x) => ({...x, productId:x._id})),
            shippingAddress:req.body.shippingAddress,
            paymentMethod:req.body.paymentMethod,
            itemsPrice:req.body.itemsPrice,
            tax:req.body.tax,
            shippingPrice:req.body.shippingPrice,
            totalOrder:req.body.totalOrder,
            user:req.user._id
        })

        const order = await newOrder.save()

        res.status(201).send({message:'new order created', order})


    } catch (error) {
        console.log(error)
    }

})




export default orderRoutes