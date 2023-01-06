import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'

import seedRouter from './routes/seedRoutes.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()
const app = express()
app.use(express.json());

app.use(cors())

//connecting to db
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('connection done')
    })
    .catch(err => {
        console.log(err)
    })


//creating sample
app.use('/api/seed', seedRouter)
//to fetch all the products
app.use('/api/products', productRoutes)
//all about user
app.use('/api/user', userRoutes)
//about orders
app.use('/api/orders', orderRoutes)

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`server at http://localhost:${port}`)
})