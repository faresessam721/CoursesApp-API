const express = require('express');
let userControllers = require('../controllers/userController.js');
let router = express.Router();
const verifyToken = require('../middlewares/verifyToken.js')

router.route('/')
    .get(verifyToken,userControllers.getALL)
    
router.route('/register')
    .post(userControllers.register)

router.route('/login')
    .post(userControllers.login)

module.exports = router;