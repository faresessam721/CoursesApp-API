let {body,validationResult} = require('express-validator');

let validation = () => {
    return [
        body('title')
            .notEmpty()
            .withMessage("tittle is required")
            .isLength({min:2})
        ,body('price')
            .notEmpty()
            .withMessage("price is required")]}

module.exports = {validation};