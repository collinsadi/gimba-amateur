const express = require('express')
const morgan = require('morgan')
const app = express()
const ethers = require('ethers');
const mongoose = require('mongoose')
const blogroutes = require('./routes/blogRoutes')
const dashboardroutes = require('./routes/dashboard')
const superadminroutes = require('./routes/superadminroute')
const profileroutes = require('./routes/profile')
const swaggerDocumentations = require('./routes/documentations')
const {useroutes} = require('./routes/userauthroutes')
const Session = require('express-session');
const cookieparser = require('cookie-parser')
const MongoStore = require('connect-mongo')
const swaggerDocs = require('swagger-ui-express')

require('dotenv').config();

// connect to mongodb
const liveurl = process.env.LIVE_URI
const localurl = process.env.MONGODB_URI;

mongoose.connect(liveurl,{useNewUrlParser: true, useUnifiedTopology: true})

.then(_=>{
    console.log('Connected to DataBase ):')
})
.catch(err=>{
    console.log("Could not connect to database X_X")
    console.log(err)
})

// Server Port

const port = process.env.PORT || 4000;
app.use(express.json({limit: '10mb'})); 

// Main Server

app.listen(port, ()=>{
console.log("Server Started at Port "+ port)
})
app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true}))
app.use(morgan('dev'))
app.use(cookieparser())
app.use(Session({
    secret: "mysecretblog",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({mongoUrl: liveurl})
}))
mongoose.set('debug', true)






app.get('/about', (req, res)=>{

    res.render('about')
})
app.get('/contact', (req, res)=>{

    res.render('contact')
})

app.use('/documentations/api',swaggerDocs.serve)
app.use('/documentations/api',swaggerDocs.setup(swaggerDocumentations))

app.use(blogroutes)
app.use(useroutes)
app.use(profileroutes)
app.use(superadminroutes)





app.use(dashboardroutes)
app.use((req, res)=>{

    res.status(404).render('404')
})


