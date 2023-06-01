

const express = require('express')
const router = express.Router();
const BlogPost = require('../models/blog')

router.get('/dashboard/articles', async (req, res) => {
    try {
      const authorId = req.query.authorid;
  
      const blogPosts = await BlogPost.find({ author: authorId });
      
  
      res.status(200).render('mrarticles', { blogpost: blogPosts });
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  });
  
   // console.log(AuthorId)

    


    //console.log(res.session)





module.exports = router;