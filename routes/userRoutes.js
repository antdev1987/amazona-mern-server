import express from 'express'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils.js'

const userRoutes = express.Router()


userRoutes.post('/signin', async(req,res)=>{


    try {

        const usuarioDb = await User.findOne({email:req.body.email})

        //check if user exist
        if(!usuarioDb){
            return res.status(400).json({message:'user email or pass wrong'})
        }

        //check if password match
        if(! bcrypt.compareSync(req.body.password , usuarioDb.password)){
            return res.status(400).json({message:'user email or pass wrong'})
        }

        const userAuthenticated = {
            _id:usuarioDb._id,
            email:usuarioDb.email,
            name:usuarioDb.name,
            isAdmin:usuarioDb.isAdmin,
            token:generateToken(usuarioDb)
        }

        res.json(userAuthenticated)
        
    } catch (error) {
        console.log(error)
    }

})


export default userRoutes