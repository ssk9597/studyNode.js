const User = require('../models/UserRegister');
const path = require('path');

module.exports = (req, res) => {
    User.create(req.body, (err, user) => {
        if (err) {
            console.error(err);
            return res.redirect('/register');
        }
        res.redirect('/');
    });
};
