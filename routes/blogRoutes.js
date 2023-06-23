const express = require('express')
const router = express.Router()
const BlogPost = require('../models/blog')
const Draft = require('../models/draft')
const Trash = require('../models/Trash')
const User = require('../models/user')




router.get('/', (req, res) =>{

    BlogPost.find({tooManyReports: {$ne: true}}).sort({createdAt: -1})

    .then(result =>{

    res.render('index', {blogpost: result})

    })



})



router.get('/create', (req, res)=>{

    res.redirect('/dashboard')

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

router.get('/api/get_post/:blogpostid', async (req, res)=>{

    const blogpostId = req.params.blogpostid

    try{

        const blog = await BlogPost.findById(blogpostId)
        
        if(!blog){

            return res.status(404).json({details: "Blog Post Not Found"})
        }

        const blogAuthor = await User.findById(blog.author)

        if(blog.tooManyReports){

            return res.status(401).json({blogAuthor, details: "This Post Has Been Hidden as it has been having too many Reports of Violation"})
        }

        res.status(201).json({blogAuthor, blog})

    }
    catch(error){

        res.status(401).json({details: "Error Occured"})

        //console.log(error)
    }

})


router.post('/api/report_post/:id', async (req, res)=>{

    const id = req.params.id

    const {issue, details} = req.body

    try{

    const blogToReport = await BlogPost.findById(id)

    if(!blogToReport){

        return res.status(404).json({details: "The Blog Post Was Not Found"})
    }

    const report = {issue, details}

    blogToReport.reports.push(report)

    await blogToReport.save()

    if(blogToReport.reports.length === 20){

        blogToReport.tooManyReports = true

        await blogToReport.save()

    }

    res.status(201).json({details: "Report Submitted Sucessfully"})

    } catch(error){

        console.log(error)

        res.status(500).json({details: "An Error occured on the server side"})
    }

})





module.exports = router