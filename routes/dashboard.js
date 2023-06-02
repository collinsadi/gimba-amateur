

const express = require('express')
const router = express.Router();
const BlogPost = require('../models/blog')

router.post('/dashboard/articles', async (req, res) => {
    try {
      const authorId = req.body.authorid;

      if(!authorId){
        return console.log('Error Getting Admin')
      }
  
      const blogPosts = await BlogPost.find({ author: authorId });
      
  
      res.status(200).send({blogpost: blogPosts});
    } catch (error) {
      console.log(error);
      res.status(500).send('Internal server error');
    }
  });

  router.get('/dashboard/articles', async (req, res) =>{

    res.status(200).render('mrarticles')

  })
  
   // console.log(AuthorId)

    


    //console.log(res.session)





module.exports = router;