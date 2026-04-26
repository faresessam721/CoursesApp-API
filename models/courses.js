let mongoose = require('mongoose')

let coursesSchema = new mongoose.Schema({
    tittle:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('Course',coursesSchema);