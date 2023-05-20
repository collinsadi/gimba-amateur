const express = require('express')
const router = express.Router()
const BlogPost = require('../models/blog')




router.get('/', (req, res) =>{

    BlogPost.find()

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
}).catch((err) => {
    console.log(err)
});

})


router.get('/show-all', (req, res)=>{

    BlogPost.find()

    .then(result =>{
        res.send(result)
    })
    .catch(err =>{
        console.log(err)
    })
})









module.exports = router