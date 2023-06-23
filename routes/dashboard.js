

const express = require('express')
const router = express.Router();
const BlogPost = require('../models/blog')
const Trash = require('../models/Trash')
const Draft = require('../models/draft')
const {authMiddleWare} = require('./userauthroutes');
const User = require('../models/user');
const Notification = require('../models/notification');


//router.use(authMiddleWare);


router.post('/api/create_blog',  authMiddleWare, async (req, res)=>{

  const  {blog_title,blog_snippet,blog_category,blog_related_category,blog_body,blog_body_image_url,authorId } = req.body
  
  try {
  
      // const AuthorId = authorId;
  
  
      const newblog = await BlogPost.create({
  
          blog_title,
          blog_snippet,
          blog_body,
          blog_category,
          blog_related_category,
          blog_body,
          blog_body_image_url,
          author: authorId
  
      })
     // newblog.save()
      .then((result) => {
  
          //console.log(result)
          res.status(200).send(result)
  
      }).catch((err) => {
          //console.log(err)
          res.status(400).send(err)
      });
  
  
  
  } catch (error) {
  
      //console.log(error)
      
  }
  
  })


router.post('/api/get_user_articles', authMiddleWare, async (req, res) => {
    try {
      const authorId = req.body.authorid;

      if(!authorId){
        return //console.log('Error Getting Admin')
      }
  
      const blogPosts = await BlogPost.find({ author: authorId }).or({tooManyReports: {$ne: true}}).sort({createdAt: -1});
      
  
      res.status(200).send({blogpost: blogPosts});
    } catch (error) {
      //console.log(error);
      res.status(500).send('Internal server error');
    }
  });

  router.get('/dashboard/articles', authMiddleWare, async (req, res) =>{

    res.status(200).render('mrarticles')

  })

  router.get('/dashboard/edit-blog', authMiddleWare, async (req, res) => {

    res.status(200).render('editBlog')

  })

  router.post('/api/get_old_blog_data/:id', authMiddleWare, async (req, res)=>{

    const id = req.params.id

    try {

      const blogtoedit = await BlogPost.findById(id)

      if(!blogtoedit){
        res.status(401).json({details: "Blog Not Found"})
      }

      res.status(200).json({oldDetails: blogtoedit})
      
    } catch (error) {
      //console.log(error)
    }

  })
  
   // //console.log(AuthorId)

   router.get('/dashboard/trash', authMiddleWare, (req, res)=>{

      res.status(200).render('trash')
   })

   router.delete('/api/trash_blog_post/:id',  authMiddleWare, async (req, res)=>{

    const blogId = req.params.id
    
    //console.log(blogId)
    
    
    try {
    
        
    
        const blog = await BlogPost.findById(blogId)
    
        //console.log(blog)
    
        if(!blog) {
    
            return res.status(401).json({details: "Blog Post Not Found"})
        }
    
        //  await Trash.create(blog)
    
        const trashBlog = new Trash({
            blog_title: blog.blog_title,
            blog_snippet: blog.blog_snippet,
            blog_category: blog.blog_category,
            blog_related_category: blog.blog_related_category,
            blog_body: blog.blog_body,
            blog_body_image_url: blog.blog_body_image_url,
            author: blog.author
        })
    
        await trashBlog.save()
    
        await BlogPost.findByIdAndDelete(blogId)
    
        return res.status(200).json({details: "Blog Moved to Trash"})
    } catch (error) {
        //console.log(error)
    
        res.status(500).json({details: "Internal Server Error"})
    }
    
    
    
    })
    
    router.put('/api/edit_blog_post/:id',  authMiddleWare, async (req, res)=>{
    
        const id = req.params.id
    
        const  {blog_title,blog_snippet,blog_category,blog_related_category,blog_body,blog_body_image_url} = req.body
    try {
    
        await BlogPost.findByIdAndUpdate(id, req.body)
    
    return res.status(200).json({details: "Blog Updated Sucessfully"})
    
    } catch (error) {
    
        //console.log(error)
        
    }
       
    
    
    })
    

    router.post('/api/get_user_trash',  authMiddleWare, async (req, res)=>{

      try {
        
        const authorId = req.body.author

        const TrashItems = await Trash.find({author: authorId}).sort({createdAt: -1})

        res.status(200).json({TrashItems})

      } catch (error) {

        //console.log(error)
        
      }


    })

   
    // router.delete('/dashboard/trash/:id', async (req, res)=>{

    //   const id = req.params.id

    //   try {

    //     await Trash.findByIdAndDelete(id)

    //     res.status(200).json({details: "Trash Item Deleted"})
        
    //   } catch (error) {
    //     //console.log(error)
    //   }

    // })



    router.delete('/api/delete_restore_blog/:id', authMiddleWare, async (req, res)=>{

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
        //console.log(error)
      }

    })


    router.get('/dashboard/drafts', authMiddleWare, (req, res)=>{

      res.status(200).render('draft')

    })

    router.post('/api/create_draft', authMiddleWare,  async(req, res)=>{


      const  {blog_title,blog_snippet,blog_category,blog_related_category,blog_body,blog_body_image_url,authorId } = req.body
  
      try {
      
          // const AuthorId = authorId;
      
      
          const newblog = await Draft.create({
      
              blog_title,
              blog_snippet,
              blog_body,
              blog_category,
              blog_related_category,
              blog_body,
              blog_body_image_url,
              author: authorId
      
          })
         // newblog.save()
          .then((result) => {
      
              //console.log(result)
              res.status(200).send(result)
      
          }).catch((err) => {
              //console.log(err)
              res.status(400).send(err)
          });
      
      
      
      } catch (error) {
      
          //console.log(error)
          
      }
      
  
  })

    router.post('/api/get_user_drafts', async (req, res)=>{

      const authorId = req.body.author

      try{

        const draftItems = await Draft.find({author: authorId}).sort({createdAt: -1})

        res.status(200).json({drafts: draftItems})

      } catch(error){

        //console.log(error)
      }


    })

    router.delete('/api/delete_draft/:id',authMiddleWare , async (req, res)=>{

      const blogId = req.params.id

      try{

        await Draft.findByIdAndDelete(blogId)

        res.status(200).json({details: "Item Deleted From Draft"})
        return;
      } catch(error){

        //console.log(error)
        res.status(401).send({details: "Requested Item not Found in Draft"})
      }

    })

    router.get('/dashboard/edit-draft', authMiddleWare, (req, res)=>{

      res.render('editdraft')

    })

    router.post('/api/get_old_draft_data/:id', authMiddleWare, async (req, res) => {

      const blogId = req.params.id
      const authorId = req.body.author

      try{

          const draftItem = await Draft.findById(blogId)

        // if(!draftItem){

        //   return res.status(401).json({details: "Draft Item Not found"})
        // }

        // if(draftItem.author !== authorId){

        //   res.status(401).json({details: "Unauthorized", redirectUrl: "/dashboard"})
        //   return;
        // }

        res.status(200).json({details: "Draft Item to Edit Found", draft: draftItem})
        return
      }catch(error){

        //console.log(error)
      }

    })

    router.put('/api/edit_draft/:id', authMiddleWare, async (req, res) =>{

      const id = req.params.id

      const  {blog_title,blog_snippet,blog_category,blog_related_category,blog_body,blog_body_image_url} = req.body


      try{

        await Draft.findByIdAndUpdate(id, req.body)

        res.status(200).json({details: "Draft Item Updated"})

      }
      
      
      
      catch(error){



        //console.log(error)
      
        res.status(500).json({details: "Internal Server Error"})
      
      
      }

    })

    router.post('/api/publish_draft/:id', authMiddleWare, async (req, res)=>{

      const id = req.params.id

      const  {blog_title,blog_snippet,blog_category,blog_related_category,blog_body,blog_body_image_url,authorId } = req.body

try {

    // const AuthorId = authorId;

    await Draft.findByIdAndDelete(id)

    const newblog = await BlogPost.create({

        blog_title,
        blog_snippet,
        blog_body,
        blog_category,
        blog_related_category,
        blog_body,
        blog_body_image_url,
        author: authorId

    })
   // newblog.save()
   res.status(200).json({details: "Blog Post Created"})

  

} catch (error) {

    //console.log(error)
    
}


    })

    router.get('/dashboard/settings', authMiddleWare, (req, res)=>{

      res.status(200).render('settings')

    })

    ////console.log(res.session)

    router.post('/api/get_user_information/:id', authMiddleWare, async (req, res)=>{

      const id = req.params.id

      try{

      const currentUser =  await User.findById(id)
        
      if(!currentUser){

       return res.status(401).json({details: "Your Request did not Return any Response"});
      }

      res.status(201).json({details: "User Found", currentUser})
      }catch(error){

        res.status(500).json({details: "An Error Occured"})

      }

    
    })

    router.put('/api/edit_user/:id', authMiddleWare, async(req, res)=>{

      const id = req.params.id

      const {full_name,profileimage, bio, twitter, website} = req.body;

      try {

        await User.findByIdAndUpdate(id, req.body)

        res.status(200).json({details: "User Updated Sucessfully"})
        return;
      } catch (error) {
        //console.log(error)
        res.status(404).json({details: "an Error Occured"})
      }

    })

   router.put('/api/request_verification/:id', authMiddleWare, async(req, res)=>{

    const id = req.params.id

    try{

      const user = await User.findById(id)

      if(!user) {
        return res.status(401).json({details: "User is not Found"});
      }

      user.verified = "requested"

      await user.save()

    res.status(200).json({details: "Verification Request Submitted"})
    } catch(error) {

      //console.log(error)
    }

   })

   router.get('/dashboard/notifications',   authMiddleWare, (req, res)=>{

    res.status(200).render('notifications')

   })


   router.post('/api/get_user_notification/:username',   authMiddleWare, async(req, res)=>{

    const useridname = req.params.username
    const userId = req.body.id

    try{

        const user = await User.findOne({useridname})

       
        if(!user){

          return res.status(401).json({details: 'an error Occured'});

        }

        if(!userId){

          return res.status(401).json({details: "an Error Occured"})
        }

        const verificationId = user._id

        if(verificationId != userId){


          // //console.log(user._id)
          // //console.log(useridname)
          // //console.log(userId)

          return res.status(401).json({details: "Unauthorized Request"})
        }

      const notifications = await Notification.find({receiver: useridname}).sort({createdAt: -1})

      res.status(200).json({notifications})


    } catch(error){
      //console.log(error)
    }


   })

   router.get('/view-notification',  authMiddleWare, (req, res)=>{

    res.status(200).render('viewNotification')
   })

   router.post('/api/view_user_notification',  authMiddleWare, async (req, res)=>{

    const notificationid = req.body.notificationid
    const receiverid = req.body.receiverid

    try{

      if(!receiverid){

        res.status(401).json({details: 'an Error Occured'})
      }

      const receiver = await User.findById(receiverid)

      if(!receiver){

        return res.status(401).json({details: "an Error Occured"})
      }

      const notification = await Notification.findById(notificationid)

      if(!notification){

        return res.status(401).json({details: "an Error Occured"})
      }

      if(notification.receiver !== receiver.useridname){

        return res.status(401).json({details: "an Error Occured"})
      }

      notification.status = "seen"

      await notification.save()

      res.status(201).json({notification})




    } catch(error){

      //console.log(error)
    }

   })


   router.post('/api/get_block_status',   authMiddleWare, async(req, res)=>{

    const userid = req.body.id

    try{

      if(!userid){

        return res.status(401).clearCookie('token')
      }

      const user = await User.findById(userid)

      if(!user){

        return res.status(401).clearCookie('token')
      }

      if(user.blocked){

        res.clearCookie('token')
        res.status(401).json({details: "Your Account Have Been Blocked"})
        return;
      }

      res.status(201).json({details: "Check Passed, Acount Active"})


    } catch(error){

    }


   })


// Profile page

// router.get('/u/:username', async(req, res)=>{

//   const useridname = req.params.username

//   try{

//     const user = await User.findOne({useridname})

//     if(!user){

//       // res.status(401).json({details: "User Not Found"})
//       res.status(404).render("404")
//       return;
//     }

//     res.status(200).send(user)

//   }catch(error){
//     //console.log(error)
//     res.status(500).json("Internal Server Error")
//   }


// })

module.exports = router;