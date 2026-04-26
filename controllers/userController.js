let express = require('express');
const wrapper = require('../middlewares/wrapper')
const appError = require('../utils/appError')
let User = require('../models/users')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Token = require('../utils/token');

const getALL= wrapper(async (req,res,next) => {
    let users = await User.find({} , {"_v":false , 'password':false})
    res.json({status: 'Success' ,data :{users}});
});

const register = wrapper(async (req,res,next) => {
    const {name , email , password  , role} = req.body;

    const user = await User.findOne({email:email})
    if(user){
        const error = appError.create('email is used' , 404 , 'FAIL')
        return next(error)
    }

    const hashedPassword = await bcrypt.hash(password , 10)

    const newUser = new User({
        name,
        email,
        password : hashedPassword,
        role
    })

    const token = await Token({email:newUser.email , id:newUser._id , role: newUser.role})
    newUser.token = token;

    await newUser.save();
    res.status(201).json({status: 'Success' ,data :{newUser}});

})

const login = wrapper(async(req,res,next) => {
    const {email,password} = req.body;

    if(!email && !password){
        const error = appError.create('user not found' , 404 , 'FAIL')
        return next(error)
    }
    const user = User.findOne({email:email});
    if(!user) {
        const error = appError.create('user not found' , 500 , 'ERROR')
        return next(error)
    }
    const matchedPassword = await bcrypt.compare(password , user.password)
    
    if (user && matchedPassword){
        const token = await Token({email:user.email , id:user._id , role: user.role})

        return res.json({status: 'Succes' , data : token})
    }else {
        const error = appError.create('user not found' , 500 , 'ERROR')
        return next(error)
    }
})

module.exports = {
    getALL,
    register,
    login
}