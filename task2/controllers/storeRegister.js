//modules
const { validationResult } = require('express-validator');

//models
const Register = require('../models/UserRegister');

module.exports = (req, res) => {
    //initialize
    errorMessage = [];
    username = '';

    //errorMessage
    const errors = validationResult(req);

    //errorExist
    if (!errors.isEmpty()) {
        const errors_array = errors.array();
        errorMessage = errors_array;
        return res.redirect('/register');
    }

    //username(index.ejs)
    username = req.body.name;
    //DB
    Register.create(req.body, (err, register) => {
        res.redirect('/');
    });
};
