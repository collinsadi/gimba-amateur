const express = require('express')
const router = express.Router();
const BlogPost = require('../models/blog')
const Trash = require('../models/Trash')
const Draft = require('../models/draft')
const User = require('../models/user');




router.get('/u/:username', async(req, res)=>{

   // const useridname = req.params.username
  res.status(200).render('profile')
    // try{
  
    //   const user = await User.findOne({useridname})
  
    //   if(!user){
  
    //     // res.status(401).json({details: "User Not Found"})
    //     res.status(404).send("404")
    //     return;
    //   }
  
      
    //   res.status(200).json({user})
  
    // }catch(error){
    //   console.log(error)
    //   res.status(500).json("Internal Server Error")
    // }
  
  
  })

  router.get('/api/get_user_profile/:username', async (req, res)=>{
    const useridname = req.params.username
  
    try{
  
      const user = await User.findOne({useridname})
  
      if(!user){
  
        // res.status(401).json({details: "User Not Found"})
        res.status(404).json({details: "Author Not Found"})
        return;
      }
  
      // res.status(200).render('profile')
      const blogs = await BlogPost.find({author: user._id})
      res.status(200).json({user, posts: blogs})
  
    }catch(error){
      console.log(error)
      res.status(500).json("Internal Server Error")
    }
  

  })

//   router.get('/api/get_posts/id', async (req, res)=>{

//     const id = req.params.id

// try{

// const bloh



// } catch(error){

//   console.log(error)
// }

//   })
  

router.get('/profile',  (req, res)=>{

  res.status(200).render('profile')

})
  
  module.exports = router;