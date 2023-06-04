

const express = require('express')
const router = express.Router();
const BlogPost = require('../models/blog')
const {authMiddleWare} = require('./userauthroutes')


router.use(authMiddleWare);

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

  router.get('/dashboard/edit-blog', async (req, res) => {

    res.status(200).render('editBlog')

  })

  router.post('/dashboard/edit-blog/:id', async (req, res)=>{

    const id = req.params.id

    try {

      const blogtoedit = await BlogPost.findById(id)

      if(!blogtoedit){
        res.status(401).json({details: "Blog Not Found"})
      }

      res.status(200).json({oldDetails: blogtoedit})
      
    } catch (error) {
      console.log(error)
    }

  })
  
   // console.log(AuthorId)

    


    //console.log(res.session)





module.exports = router;