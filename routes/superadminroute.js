const express = require('express')
const router = express.Router();
const BlogPost = require('../models/blog')
const Trash = require('../models/Trash')
const Draft = require('../models/draft')
const User = require('../models/user');
const SuperAdmin = require('../models/superadmin');
const Notification = require('../models/notification');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const jwtsecret = "mysecretadmin"

const authMiddleWare = async (req, res, next) =>{

    const token = req.cookies.token;

    if(!token) {

        // res.status(401).json({ message: 'Unauthorized'})

        res.redirect('/404')
        return;
    }


    try {

        const decoded = await jwt.verify(token, jwtsecret)
        req.userId = decoded.UserId
        console.log(req.userId)
        next()
    } catch (error) {
        return res.redirect('/404')
//  res.status(401).json({ message: 'Unauthorized'})
    }




}


router.post('/api/create_super_admin',  async (req, res)=>{

    const {full_name, email, password, useridname} = req.body;

    try{

        const hashedpassword = await bcrypt.hash(password, 10)

        try{

            const superadmin = await SuperAdmin.create({full_name, email, password: hashedpassword, useridname})
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

router.post('/api/get_super_admin', async (req, res)=>{

    const {email, password} = req.body;

    const superadmin = await SuperAdmin.findOne().or([{email},{useridname: email}])

    if(!superadmin){

        res.status(401).send({message: "Invalid Credentials"})
        return;
    }

    const ispasswordvalid = await bcrypt.compare(password, superadmin.password)

    if(!ispasswordvalid){

        res.status(401).send({message: "Invalid Credentials"});
        return;
    }

   if(superadmin.role !== "superadmin"){

    res.status(401).send({message: "Un Authorized"});
    return;
   }
    
   
    const token = jwt.sign({userId: superadmin._id}, jwtsecret)
    res.cookie("token", token, {httpOnly: true});
   // req.session.authorId = user._id
    res.status(200).send({message: "Log In Sucessful",  redirectUrl: '/dashboard', author: superadmin, role: superadmin.role  })


})

router.get('/superadmin/login', (req, res)=>{

    res.status(200).render('superadmin/login')
})


router.get('/superadmin/dashboard', authMiddleWare, (req, res)=>{

    res.status(200).render('superadmin/dashboard')


})
router.get('/superadmin/dashboard/blogs', authMiddleWare, (req, res)=>{

    res.status(200).render('superadmin/blog')


})
router.get('/superadmin/dashboard/notifications', authMiddleWare, (req, res)=>{

    res.status(200).render('superadmin/notification')


})
router.get('/superadmin/dashboard/users', authMiddleWare, (req, res)=>{

    res.status(200).render('superadmin/users')


})
router.get('/superadmin/dashboard/blacklist', authMiddleWare, (req, res)=>{

    res.status(200).render('superadmin/blacklist')


})




router.post('/api/superadmin/get_all_blogs', authMiddleWare, async (req, res)=>{

    try{

        const allBlogs = await BlogPost.find().sort({createdAt: -1})

        res.status(201).json({allBlogs})

    }catch(error){

        res.status(401).json({details: "Error Getting Posts"})
        console.log(error)
    }

})

router.delete('/api/superadmin/delete_blog/:id', authMiddleWare, async (req, res)=>{

    const id = req.params.id

    try{

        const blog = await BlogPost.findById(id)

        if(!blog){

         return  res.status(400).json({details: "Blog Not Found"})
        }

      const user =  await User.findById(blog.author)

    if(!user){

        return res.status(400).json({details: "Author Not found "})
    }

        await Notification.create({notification_title: "Your Post "+ blog.blog_title + " Has Been Deleted", receiver: user.useridname, notification_body: "The Post Was Deleted Because it Goes Against Our Community Standards, we Understand that mistakes happen but Continious Violation would Get your Account Permanently Deleted, We are  working Every day to make GIMBA a safe space for readers,if you think this Deletion was a mistake, feel free to Message the admin from the Chat Support at the bottom of your Screen                    from the SuperAdmin"})

        await BlogPost.findByIdAndDelete(id)

        res.status(201).json({details: "BlogPost Deleted"})


    }catch(error){

        res.status(500).json({details: "an Error Occured"})
        console.log(error)
    }

})

router.post('/api/superadmin/send_notification', authMiddleWare,  async (req, res)=>{

    const {notification_title, receiver, notification_body} = req.body

    try{

        if(!notification_title){

            return res.status(401).json({details: "Notification Title is Required"});
        }
        if(!receiver){

            return res.status(401).json({details: "Notification Receiver Required"})
        }
        if(!notification_body){

            return res.status(401).json({details: "Notification Body Required"})
        }

       await Notification.create({notification_title, receiver, notification_body})

        res.status(201).json({details: "Notification Sent Sucessfully"})

    } catch(error){

        res.status(500).json({details: "an Error Occured"})
        console.log(error)
    }

})

router.post('/api/superadmin/get_notifications', authMiddleWare, async (req, res)=>{

try{

    const notifications = await Notification.find().sort({createdAt: -1})

    res.status(200).json({notifications})


} catch(error) {

    res.status(500).json({details: "an Error Occured"})

    console.log(error)
}
 
})

router.post('/api/superadmin/get_all_users', authMiddleWare, async (req, res)=>{

    try{

     const authors =   await User.find().sort({createdAt: -1})

    

        res.status(200).json({details: "Blogs Found", authors })
    }catch(error){

        res.status(500).json({details: "an Error Occured"})

        console.log(error)
    }


})

router.post('/api/superadmin/verify_user',  authMiddleWare, async (req, res)=>{

const userId = req.body.userid

try {

    const user = await User.findByIdAndUpdate(userId, {verified: "verified"})

    await user.save()

    res.json({details: "User Verified"})

}catch(error){

    console.log(error)
}



})





module.exports = router;