const express = require('express')
const router = express.Router()
const BlogPost = require('../models/blog')
const Draft = require('../models/draft')




router.get('/', (req, res) =>{

    BlogPost.find().sort({createdAt: -1})

    .then(result =>{

    res.render('index', {blogpost: result})

    })



})



router.get('/create', (req, res)=>{

    res.redirect('/dashboard')

})

router.post('/api/create_blog', async (req, res)=>{

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

        console.log(result)
        res.status(200).send(result)

    }).catch((err) => {
        console.log(err)
        res.status(400).send(err)
    });



} catch (error) {

    console.log(error)
    
}

})

router.post('/api/create_draft', async(req, res)=>{


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
    
            console.log(result)
            res.status(200).send(result)
    
        }).catch((err) => {
            console.log(err)
            res.status(400).send(err)
        });
    
    
    
    } catch (error) {
    
        console.log(error)
        
    }
    

})


router.get('/blog-post/:id', (req, res)=>{

    const id = req.params.id
    BlogPost.findById(id)
    .then(result=>{
        res.render('singleblog', {blogpost: result, title: result.blog_title.toUpperCase()})
    })
    .catch(error=>{
        res.status(404).render('404')
    })

})



// router.get('/show-all', (req, res)=>{

//     BlogPost.find()

//     .then(result =>{
//         res.send(result)
//     })
//     .catch(err =>{
//         console.log(err)
//     })
// })









module.exports = router