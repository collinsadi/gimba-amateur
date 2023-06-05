

const express = require('express')
const router = express.Router();
const BlogPost = require('../models/blog')
const Trash = require('../models/Trash')
const Draft = require('../models/draft')
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

   router.get('/dashboard/trash', (req, res)=>{

      res.status(200).render('trash')
   })

    router.post('/dashboard/trash', async (req, res)=>{

      try {
        
        const authorId = req.body.author

        const TrashItems = await Trash.find({author: authorId})

        res.status(200).json({TrashItems})

      } catch (error) {

        console.log(error)
        
      }


    })

   
    // router.delete('/dashboard/trash/:id', async (req, res)=>{

    //   const id = req.params.id

    //   try {

    //     await Trash.findByIdAndDelete(id)

    //     res.status(200).json({details: "Trash Item Deleted"})
        
    //   } catch (error) {
    //     console.log(error)
    //   }

    // })



    router.delete('/dashboard/trash/:id', async (req, res)=>{

      const id = req.params.id
      const action = req.body.action

      try {

        if(action === 'delete'){

        await Trash.findByIdAndDelete(id)

        res.status(200).json({details: "Trash Item Deleted"})
        return;
        } else if(action === 'restore') {

        const gottenTrash = await Trash.findById(id)

          const restoredPost = new BlogPost({

            blog_title: gottenTrash.blog_title,
            blog_snippet: gottenTrash.blog_snippet,
            blog_category: gottenTrash.blog_category,
            blog_related_category: gottenTrash.blog_related_category,
            blog_body: gottenTrash.blog_body,
            blog_body_image_url: gottenTrash.blog_body_image_url,
            author: gottenTrash.author

          })

        await restoredPost.save()

        await Trash.findByIdAndDelete(id)

        res.status(200).json({details: "Blog Post Restored"})

        return;

        } else{

          res.status(401).json({details: "Invalid Action"})
        }

        
        
      } catch (error) {
        console.log(error)
      }

    })


    router.get('/dashboard/drafts', (req, res)=>{

      res.status(200).render('draft')

    })

    router.post('/dashboard/drafts', async (req, res)=>{

      const authorId = req.body.author

      try{

        const draftItems = await Draft.find({author: authorId})

        res.status(200).json({drafts: draftItems})

      } catch(error){

        console.log(error)
      }


    })

    //console.log(res.session)





module.exports = router;