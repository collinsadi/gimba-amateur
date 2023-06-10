const express = require('express')
const router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const jwtsecret = "mysecretblog"





const authMiddleWare = async (req, res, next) =>{

    const token = req.cookies.token;

    if(!token) {

        // res.status(401).json({ message: 'Unauthorized'})

        res.redirect('/join')
        return;
    }


    try {

        const decoded = await jwt.verify(token, jwtsecret)
        req.userId = decoded.UserId
        console.log(req.userId)
        next()
    } catch (error) {
        return res.redirect('/join')
//  res.status(401).json({ message: 'Unauthorized'})
    }




}



router.get('/join', (req, res)=>{


    res.status(200).render('signup')



})

router.post('/api/create_user', async (req, res)=>{

    const {full_name, email, password, useridname, bio, twitter, website} = req.body;

    try{

        const hashedpassword = await bcrypt.hash(password, 10)

        try{

            const user = await User.create({full_name, email, password: hashedpassword, useridname, bio, twitter, website})
            res.status(200).send({message: "Sign Up Sucessful"})
            return;
        } catch(error){



            if(error.keyPattern.useridname && error.keyPattern.email){

                
                res.status(401).json({message: "Email and Username Already In Use"})
                // console.log(error)
                return;
            }
            if(error.keyPattern.useridname){

                // console.log("na user name cause am")

                
                res.status(401).json({message: "Username Already In Use"})
                // console.log(error)
                return;
            }
            if(error.keyPattern.email){

                // console.log("na email cause am")

                
                res.status(401).json({message: "Email Already In Use"})
                console.log(error)
                return;

            }

            if(error.code === 11000){

                // res.status(401).send({message: "User Already In Use"})
                console.log(error)
                return;
            }

            res.status(500).json({message: "Internal Server Error"})
            console.log(error)
            return;
            
        }

    } catch(error){

        console.log(error)
    }
    


})

router.post('/api/get_user', async (req, res)=>{

    const {email, password} = req.body;

    const user = await User.findOne().or([{email},{useridname: email}])

    if(!user){

        res.status(401).send({message: "Invalid Credentials"})
        return;
    }

    const ispasswordvalid = await bcrypt.compare(password, user.password)

    if(!ispasswordvalid){

        res.status(401).send({message: "Invalid Credentials"});
        return;
    }

   
    
   
    const token = jwt.sign({userId: user._id}, jwtsecret)
    res.cookie("token", token, {httpOnly: true});
   // req.session.authorId = user._id
    res.status(200).send({message: "Log In Sucessful",  redirectUrl: '/dashboard', author: user })


})

router.get('/logout', (req, res)=>{

   res.clearCookie('token')
   res.redirect('/join')

})

router.get('/dashboard', authMiddleWare, (req, res)=>{



res.render('dashboard')

})

router.put('/api/change_password/:id', async (req, res)=>{

    const id = req.params.id

    const {oldPassword, password} = req.body

    try{

        const user = await User.findById(id)

      if(!user){

        return res.status(401).json({details: "User Was Not Found"})
      }

    const passwordIsValid =  await bcrypt.compare(oldPassword,user.password)

    if(!passwordIsValid){
      return  res.status(401).json({details: "Invalid Credentials"})
    }

    const hashedpassword = await bcrypt.hash(password,10)

   user.password = hashedpassword

   await user.save()

   res.status(201).json({details: "Password Updated Sucessfully"})

    }catch(error){

      console.log(error)

    //   res.status(500).json({details: "Internal Server Error"})
    }


  })




module.exports = {useroutes:router,authMiddleWare};