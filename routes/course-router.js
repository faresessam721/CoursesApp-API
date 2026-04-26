const express = require('express');
let controllers = require('../controllers/controller.js');
let router = express.Router();
let {validation} = require('../middlewares/validator.js')
const verifyToken = require('../middlewares/verifyToken.js');
const Authorized = require('../middlewares/authorization.js');

router.route('/')
    .get(controllers.getALL)
    .post(validation(),controllers.setCourse);

router.route('/:id')
    .get(controllers.getCourse)
    .patch(controllers.updateCourse)
    .delete(controllers.deleteCourse);

module.exports = router;