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

            const user = await User.create({full_name, email, password: hashedpassword})
            res.status(200).send({message: "Sign Up Sucessful"})
            return;
        } catch(error){

            if(error.code === 11000){

                res.status(401).send({message: "Email Already In Use"})
                console.log(error)
                return;
            }

            res.status(500).send({message: "Internal Server Error"})
            console.log(error)
            return;
            
        }

    } catch(error){

        console.log(error)
    }
    


})



module.exports = router;