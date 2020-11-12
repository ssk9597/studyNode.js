//modules
const mysql = require('mysql');
const { validationResult } = require('express-validator');

module.exports = (req, res) => {
    //initialize
    registerErrorMessage = [];
    username = '';

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
        activeUser = req.body.username;
        res.redirect('/');
    });
};