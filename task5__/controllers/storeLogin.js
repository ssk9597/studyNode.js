//modules
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

module.exports = (req, res) => {
    //initialize
    loginErrorMessage = [];

    //errorMessage
    const errors = validationResult(req);

    //errorExist
    if (!errors.isEmpty()) {
        loginErrorMessage = errors.array();
        return res.redirect('/login');
    }

    //DB
    const con = require('../database/createConnection');
    const sql = 'SELECT * FROM users';

    con.query(sql, req.body, (err, users) => {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email === req.body.email && users[i].password === req.body.password) {
                const payload = {
                    id: users[i].id,
                    username: users[i].username,
                    email: users[i].email,
                    password: users[i].password,
                    confirmPassword: users[i].confirmPassword,
                };
                const token = jwt.sign(payload, 'secret');
                req.session.token = token;
                req.session.username = payload.username;
                res.redirect('/');
            }
        }
    });
};
