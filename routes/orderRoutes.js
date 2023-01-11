import express from 'express'
import Order from '../models/orderModel.js'
import mongoose from 'mongoose'
import { isAuth } from '../utils.js'

const orderRoutes = express.Router()



// here is to save the order in data base
orderRoutes.post('/', isAuth, async (req, res, next) => {

    try {
        const newOrder = new Order({
            orderItems: req.body.orderItems.map((x) => ({ ...x, productId: x._id })),
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            tax: req.body.tax,
            shippingPrice: req.body.shippingPrice,
            totalOrder: req.body.totalOrder,
            user: req.user._id
        })

        const order = await newOrder.save()

        res.status(201).send({ message: 'new order created', order })


    } catch (error) {
        console.log(error)
    }

})


//this is to send the orders by id in the place order page
orderRoutes.get('/:id', isAuth, async (req, res, next) => {

    console.log('order routes')
    const id = req.params.id

    try {

        //to check if id is valid
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send({ message: 'You have entered an invalid Id' })
        }

        //to check if order id exist
        const order = await Order.findById(id)

        //in case order id does not exist we send this information
        if (!order) {
            return res.status(404).send({ message: 'not order found' })
        }

        res.send(order)

    } catch (error) {
        console.log(error)
    }

})

orderRoutes.put('/:id/pay', isAuth, async(req,res)=>{

    console.log(req.body)

    const order = await Order.findById(req.params.id)

    if(order){
        order.isPaid = true
        order.paidAt = Date.now()
        order.paymentResult ={
            id: req.body.id,
            status: req.body.status,
            update_time:req.body.update_time,
            email_address: req.body.email_address
        }
        const updatedOrder = await order.save()
        res.send({message:'order paid', order:updatedOrder})
    }else{
        res.status(404).send({message:'order not found'})
    }

})




export default orderRoutes