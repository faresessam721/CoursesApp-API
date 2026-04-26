const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required:true,
        },
        email:{
            type:String,
            unique:true,
            required:true,
            validate: [validator.isEmail , "must be valid email"]
        },
        password:{
            type:String,
            required:true,
        },
        token:{
            type:String
        },
        role:{
            type:String,
            enum:['user' , 'admin'],
            default:'user'
        }
    }
)

module.exports = mongoose.model('user' , userSchema)