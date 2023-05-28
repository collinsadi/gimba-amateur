const express = require('express')
const router = express.Router();



router.get('/join', (req, res)=>{


    res.status(200).render('signup')



})



module.exports = router;