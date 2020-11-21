//modules
const mysql = require('mysql');
const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    //initialize
    registerErrorMessage = [];

    //errorMessage
    const errors = validationResult(req);

    //errorExist
    if (!errors.isEmpty()) {
        registerErrorMessage = errors.array();
        return res.redirect('/register');
    }

    //DB
    const con = require('../database/createConnection');
    const sql = 'INSERT INTO users SET ?';
    con.query(sql, req.body, (err, result, fields) => {
        if (err) throw err;
        next();
    });
};
