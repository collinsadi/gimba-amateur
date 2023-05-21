const express = require('express')
const router = express.Router()
const BlogPost = require('../models/blog')




router.get('/', (req, res) =>{

    BlogPost.find().sort({createdAt: -1})

    .then(result =>{

    res.render('index', {blogpost: result})

    })



})



router.get('/create', (req, res)=>{

    res.render('createblog')

})

router.post('/api/create_blog', (req, res)=>{

const  {blog_title,blog_snippet,blog_category,blog_related_category,blog_body,blog_body_image_url, } = req.body


const newblog = new BlogPost(req.body)
newblog.save()
.then((result) => {
    console.log(result)
    res.status(200).send(result)
}).catch((err) => {
    console.log(err)
    res.status(400).send(err)
});

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