const User = require('../models/UserRegister');
const path = require('path');

module.exports = (req, res) => {
    User.create(req.body, (error, user) => {
        res.redirect('/');
    });
};
