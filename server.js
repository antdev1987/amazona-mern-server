import express from 'express'
import cors from 'cors'
import * as dotenv from 'dotenv'
import mongoose from 'mongoose'

import seedRouter from './routes/seedRoutes.js'
import productRoutes from './routes/productRoutes.js'

dotenv.config()
const app = express()


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


const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`server at http://localhost:${port}`)
})