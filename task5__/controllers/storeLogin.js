//modules
const mysql = require('mysql');
const { validationResult } = require('express-validator');

module.exports = (req, res) => {
    //initialize
    loginErrorMessage = [];
    username = '';

    //errorMessage
    const errors = validationResult(req);

    //errorExist
    if (!errors.isEmpty()) {
        loginErrorMessage = errors.array();
        return res.redirect('/login');
    }

    //DB
    const con = require('../database/createConnection');
    const sql = 'select * from users';

    con.query(sql, req.body, (err, users) => {
        for (let i = 0; i < users.length; i++) {
            if (users[i].email == req.body.email && users[i].password == req.body.password) {
                activeUser = users[i].username;
                return res.redirect('/');
            }
        }
    });
};
