import express from 'express'
import Product from '../models/productModel.js'

const productRoutes = express.Router()


//fetching all the products
productRoutes.get('/', async(req,res)=>{
   
    const products = await Product.find()
    res.send(products)

})


//to fetch a single product
productRoutes.get('/slug/:slug', async(req, res) => {
    const { slug } = req.params

    try {
        const product = await Product.findOne({slug})
        if (product) {
            res.send(product)
        } else {
            res.status(404).send({ message: 'no encontrado' })
            // throw new Error({message:'no encontrado'})
        }
        
    } catch (error) {
        console.log(error)
    }


})


// //to check count in stock
productRoutes.get('/:id', async (req, res) => {
    const { id } = req.params
   
    const product = await Product.findById(id)

    const stock = product.countInStock

    if (product) {
        res.json({ stock })
    } else {
        res.sendStatus(404).send({ message: 'no encontrado' })
        // throw new Error({message:'no encontrado'})
    }

})

export default productRoutes