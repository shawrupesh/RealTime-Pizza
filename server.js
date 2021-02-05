
require('dotenv').config()
const express=require("express")
const app=express()
const ejs=require('ejs')
const expresslayout=require('express-ejs-layouts')
const path=require("path")
const mongoose=require('mongoose')
const session=require('express-session')
const flash=require('express-flash')
const MongoDbStore=require('connect-mongo')(session)
const passport =require('passport')
app.use(express.json())
app.use(express.urlencoded({extended:false}))




//database connection
const url='mongodb://localhost/pizza';
mongoose.connect(url,{useNewUrlParser:true,useCreateIndex:true,useUnifiedTopology:true,useFindAndModify:true})
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log('database connected')
}).catch(err=>{console.log("connection failed")})



//session store
let mongoStore=new MongoDbStore({
    mongooseConnection: connection,
    collection: 'sessions'
})

//session configuration
app.use(flash())
app.use(session({
   
    secret:process.env.COOKIE_SECRET,
    resave:false,
    store: mongoStore,
    saveUninitialized:false,
    cookie: {maxAge:1000*60*60*24}
    //cookie: {maxAge:1000 * 15}
    
}))


//passport configuration

const passposrtInit =require('./app/config/passport')
passposrtInit(passport)
app.use(passport.initialize())
app.use(passport.session())






//global middleware
app.use((req,res,next) =>{
    res.locals.session=req.session
    res.locals.user=req.user
    next()
})

//Set Template
app.use(expresslayout)
app.set('views',path.join(__dirname,'/resources/views'))
console.log(__dirname,'/resouces/views')
app.set('view engine','ejs')
require('./routes/web')(app)

//assets
app.use(express.static('public'))




app.listen(3000,()=>{

    console.log("Server is running on 3000")
})