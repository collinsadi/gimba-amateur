const express = require('express')
const router = express.Router()




router.post('/blogs/new', (req, res)=>{

    res.json({
        blog_title: req.body.title,
        blog_snippet: "string",
        blog_body: "String"
    })

    if(!req.body.title){
        throw new Error("Please Add a Title")
    }

})

module.exports = router;
