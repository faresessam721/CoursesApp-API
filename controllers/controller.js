const express = require('express');
let {body,validationResult} = require('express-validator');
const wrapper = require('../middlewares/wrapper')
const appError = require('../utils/appError')
const Course = require('../models/courses')

let getALL = wrapper(async (req,res,next) => {
    let courses = await Course.find()
    res.json({status: 'Success' ,data :{courses}});
});

let getCourse = wrapper(async (req,res,next) => {
    let course = await Course.findById(req.params.id);
        if(!course){
            const error = appError.create('course not found' , 404 , 'FAIL')
            return next(error)
        }
    res.json({status: 'Success' ,data :{course}});

});

let updateCourse = wrapper(async (req,res,next) => {
    let updatedCourse = await Course.updateOne({_id : req.params.id}, {$set: {...req.body}})
    res.status(201).json({status: 'Success' ,data :{updatedCourse}})
});

let setCourse = wrapper(async (req,res,next) => {
    let errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = appError.create(errors.array() ,400, 'FAIL')
        return next(error);   
    }
    let newCourse = new Course(req.body);
    await newCourse.save();

    res.status(201).json({status: 'Success' ,data :{newCourse}});

});

let deleteCourse = wrapper(async (req,res,next) => {
    let data =  await Course.deleteOne({_id: req.params.id})
    res.status(201).json({status: 'Success' ,data :null });
});

module.exports = {
    getALL,getCourse,setCourse,updateCourse,deleteCourse
}