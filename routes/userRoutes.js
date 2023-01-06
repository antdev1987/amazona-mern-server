import express from 'express'
import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import { generateToken } from '../utils.js'

const userRoutes = express.Router()


// to login existing users
userRoutes.post('/signin', async (req, res) => {

    try {

        const usuarioDb = await User.findOne({ email: req.body.email })

        //check if user exist
        if (!usuarioDb) {
            return res.status(400).json({ message: 'user email or pass wrong' })
        }

        //check if password match
        if (!bcrypt.compareSync(req.body.password, usuarioDb.password)) {
            return res.status(400).json({ message: 'user email or pass wrong' })
        }

        const userAuthenticated = {
            _id: usuarioDb._id,
            email: usuarioDb.email,
            name: usuarioDb.name,
            isAdmin: usuarioDb.isAdmin,
            token: generateToken(usuarioDb)
        }

        res.json(userAuthenticated)

    } catch (error) {
        console.log(error)
    }

})

// to register new users
userRoutes.post('/signup', async (req, res) => {

    console.log(req.body)

    try {
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password)
        })
        await newUser.save()

        res.json({   _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            token: generateToken(newUser),})

    } catch (error) {
        //code to catch error for duplicate record in mongoose
        console.log(error)
        if(error.message.indexOf('11000') != -1){
            console.log('usuario ya existe')
            return res.status(409).send({message:"user already exist"});

         }

        res.status(500).send({message:"Something went wrong"});

    }
})


export default userRoutes