const express = require('express')
const router = express.Router();
const BlogPost = require('../models/blog')
const Trash = require('../models/Trash')
const Draft = require('../models/draft')
const User = require('../models/user');
const Ad = require('../models/ad');
const SuperAdmin = require('../models/superadmin');
const Notification = require('../models/notification');
const Blacklist = require('../models/blacklist');
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
router.get('/superadmin/dashboard/analytics', authMiddleWare, (req, res)=>{

    res.status(200).render('superadmin/analytics')


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

    const author = await User.findById(userId)

    if(!author){

        return res.status(401).json({details: "Author not found"})
    } 
    
    const user = await User.findByIdAndUpdate(userId, {verified: "verified"})

    await user.save()

    await Notification.create({notification_title: author.full_name + " Your Account Have Been Verified", receiver: author.useridname, notification_body: author.full_name + " We Found out that this was an authentic account and so we decided to verify the account to tell users that this is one of the authentic accounts on GIMBA, we are working everyday to make GIMBA a safe space for Readers, so we you not to violate any of our terms of service else, your Badge would be removed and accound disable, Sincerely: SUPER ADMIN" })

   

    res.status(200).json({details: "User Verified"})

}catch(error){

    console.log(error)
}



})


router.post('/api/superadmin/remove_user_verification',  authMiddleWare, async (req, res)=>{

const userId = req.body.userid

try {

    const author = await User.findById(userId)

    if(!author){

        return res.status(401).json({details: "Author not found"})
    } 
    
    const user = await User.findByIdAndUpdate(userId, {verified: "removed"})

    await user.save()

    await Notification.create({notification_title: author.full_name + " Your Verification Have Been Removed", receiver: author.useridname, notification_body: author.full_name + " Your Verification was removed because you went against our community Guidelines, your account would be blocked if you go against our community Guidelines again Sincerely: SUPER ADMIN" })

   

    res.status(200).json({details: "User Verification Removed"})

}catch(error){

    console.log(error)
}



})


router.post('/api/superadmin/block_user',  authMiddleWare, async (req, res)=>{

const userId = req.body.userid

try {
    
    const user = await User.findByIdAndUpdate(userId, {blocked: true})

    await user.save()
   

    res.status(200).json({details: "User Blocked"})

}catch(error){

    console.log(error)
}



}) 

router.post('/api/superadmin/unblock_user',  authMiddleWare, async (req, res)=>{

const userId = req.body.userid

try {
    
    const user = await User.findByIdAndUpdate(userId, {blocked: false})

    await user.save()
   

    res.status(200).json({details: "User UnBlocked"})

}catch(error){

    console.log(error)
}



})

router.post('/api/superadmin/create_new_blacklist',   authMiddleWare,  async (req, res)=>{

    const blacklistItem = req.body.blacklistitem

    try {

        if(!blacklistItem){

            return res.status(401).json({details: "The I tem you Tried Adding to Blacklist is Invalid"})
        }

        await Blacklist.create({blacklistItem})

        res.status(200).json({details: "Item added to Blacklist"})
    } catch (error){


        if(error.code === 11000){

            res.status(404).json({details: "Value Already Exists in  Database"})
        }

        console.log(error)
    }



})

router.post('/api/superadmin/get_blacklist_items', authMiddleWare,  async (req, res)=>{

    try{

           const blacklist =  await Blacklist.find().sort({createdAt: -1})

        res.status(200).json({blacklist})


    }
    catch(error){

        console.log(error)
    }

})

router.delete('/api/superadmin/remove_from_blacklist', authMiddleWare,  async(req, res)=>{

    const itemid = req.body.itemid

    try{

        await Blacklist.findByIdAndDelete(itemid)

        res.status(200).json({details: "Item Removed From Blacklist"})

    } catch(error){

        console.log(error)
    }


})

router.get('/api/superadmin/get_analytics', authMiddleWare,  async (req, res)=>{

    try{

        const totalUsers = await User.find()
        const notificationSent = await Notification.find()
        const blockedUsers = await User.find({blocked: true})
        const totalBlogs = await BlogPost.find()
        const verifiedUsers = await User.find({verified: "verified"})
        const loggedInUsers = await User.find({logged: true})
        const verificationRequests = await User.find({verified: "requested"})

        res.status(200).json([{totalUsers, notificationSent, blockedUsers, totalBlogs, verifiedUsers, loggedInUsers, verificationRequests}])



    } catch(error){

        res.status(500).json({details: "an Error Occured"})

    }
})


// creating ads


router.post('/api/superadmin/create_ad',  authMiddleWare,  async (req, res)=>{

    const {Ad_image, Ad_title, Ad_description, Ad_link} = req.body

try{


    await Ad.create(req.body)

    res.status(200).json({details: "Advertisement Sucesfully Created"})



} catch(error){

    console.log(error)

    res.status(401).json({details: "an Error Occured"})
}

})

// updating the add status

router.post('/api/superadmin/change_ad_status',  authMiddleWare,  async (req, res)=>{

const {id, action} = req.body

    try{

        if(action === 'activate'){

            try{

            const activeAdverts = await Ad.find({Ad_status: "active"})

            if(activeAdverts.length > 0){

             return res.status(401).json({details: "an Ad is Running, Deactivate and try again later"});
            }

            const advert = await Ad.findById(id)

            advert.Ad_status = "active"

            await advert.save()

            res.status(201).json({details: "Ad Activated"})

            } catch(error){
                
                res.status(500).json({details: "an Error Occured"})
                return;
            }

        }

        if(action === 'deactivate'){

            try{

                const advert = await Ad.findById(id)

                advert.Ad_status = "not active"
    
                await advert.save()

                res.status(201).json({details: "Ad Deactivated Sucessfully"})
            }catch(error){

                return res.status(500).json({details: "an Error Occured"})
            }

        }

    

    }
    catch(error) {

       
        console.log(error)
    }

})

// get the active ad

router.get('/api/superadmin/get_active_ad',  authMiddleWare,  async (req, res)=>{

    try{

        const activeAd = await Ad.find({Ad_status: "active"})

        if(!activeAd){

            return res.status(401).json({details: "No Active Ad at the Moment"})
        }

        res.status(201).json({activeAd})

    }
    catch(error){

        res.status(500).json({details: "An error Ocured"})
        console.log(error)
    }

})


module.exports = router;