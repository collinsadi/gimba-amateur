const express = require('express')
const morgan = require('morgan')
const app = express()
const ethers = require('ethers');
const mongoose = require('mongoose')
const blogroutes = require('./routes/blogRoutes')



// connect to mongodb

const url = 'mongodb://127.0.0.1:27017/gimba';

mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true})

.then(_=>{
    console.log('Connected to DataBase ):')
})
.catch(err=>{
    console.log("Could not connect to database X_X")
    console.log(er0r)
})

// Server Port

const port = process.env.PORT || 4000;
app.use(express.json()); 

// Main Server

app.listen(port, ()=>{
console.log("Server Started at Port "+ port)
})
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(morgan('dev'))


app.get('/about', (req, res)=>{

    res.render('about')
})
app.get('/contact', (req, res)=>{

    res.render('contact')
})

app.use(blogroutes)

app.use((req, res)=>{

    res.status(404).render('404')
})


