const express = require('express')
const router = express.Router();
const BlogPost = require('../models/blog')
const Trash = require('../models/Trash')
const Draft = require('../models/draft')
const User = require('../models/user');




router.get('/u/:username', async(req, res)=>{

    const useridname = req.params.username
  
    try{
  
      const user = await User.findOne({useridname})
  
      if(!user){
  
        // res.status(401).json({details: "User Not Found"})
        res.status(404).render("404")
        return;
      }
  
      res.status(200).send(user)
  
    }catch(error){
      console.log(error)
      res.status(500).json("Internal Server Error")
    }
  
  
  })
  


  
  module.exports = router;