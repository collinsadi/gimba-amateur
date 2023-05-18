const express = require('express')
const morgan = require('morgan')
const app = express()
const ethers = require('ethers');




// Server Port

const port = 4000;

// Main Server

app.listen(port, ()=>{

    console.log("Server Started at Port "+ port)
})

// Registering the view engines

app.set('view engine', 'ejs')

// Middlewares and static files

/*app.use(): This is the Express middleware function that is used to register middleware.
express.static(): This is the Express static middleware function that is used to serve static files.
'public': This is the directory that contains the static file*/

app.use(express.static('public'))

app.use(express.urlencoded({ extended: true}))

// app.use(): This is the Express middleware function that is used to register middleware.
//morgan(): This is the Morgan middleware function that is used to log HTTP requests and responses.
//'dev': This is the preset that is used to log all requests to the console.

app.use(morgan('dev'))

// Lets Begin

// Defining our home page route

app.get('/', (req, res) =>{

    res.render('index')

})

app.get('/about', (req, res)=>{

    res.render('about')
})





app.use((req, res)=>{

    res.status(404).render('404')
})
