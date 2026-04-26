const express = require('express');
require('dotenv').config()
const app =  express();
app.use(express.json());


let mongoose = require('mongoose')
let url = process.env.mongo_url
mongoose.connect(url).then(() => {
    console.log('server conected');
    
})

let coursesRouter = require('./routes/course-router.js');
let usersRouter = require('./routes/user-router.js')

app.use('/api/courses' , coursesRouter)
app.use('/api/users' , usersRouter)

app.use((error,req,res,next) => {
    res.status(500).json({status: error.statusText || 'ERROR' , message: error.message , code:error.statusCode})
})

app.listen(5000,() => {
    console.log("we are in port 5000");
})

