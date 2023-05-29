const express = require('express')
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')



router.get('/join', (req, res)=>{


    res.status(200).render('signup')



})

router.post('/api/create_user', async (req, res)=>{

    const {full_name, email, password} = req.body;

    try{

        const hashedpassword = await bcrypt.hash(password, 10)

        try{

            const user = User.create({full_name, email, password: hashedpassword})
            res.status(200).send({message: "Sign Up Sucessful"})
        } catch(error){

            if(error.code === 11000){

                res.status(401).send({message: "Email Already In Use"})
            }

            res.status(500).send({message: "Internal Server Error"})
        }

    } catch(error){

        console.log(error)
    }
    


})



module.exports = router;