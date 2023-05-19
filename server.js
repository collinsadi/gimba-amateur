const express = require('express')
const morgan = require('morgan')
const app = express()
const ethers = require('ethers');
const mongoose = require('mongoose')
const blogroutes = require('./routes/blogRoutes')



// connect to mongodb

const url = 'mongodb://127.0.0.1:27017/gimba';


// Server Port

const port = 4000;

// Main Server

app.listen(port, ()=>{
console.log("Server Started at Port "+ port)
})
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(morgan('dev'))
app.get('/', (req, res) =>{

    res.render('index')

})
app.get('/about', (req, res)=>{

    res.render('about')
})
app.get('/contact', (req, res)=>{

    res.render('contact')
})

// 404 Redirection page if the url does not match any of the pages that i have on my get and post requests

app.use((req, res)=>{

    res.status(404).render('404')
})
