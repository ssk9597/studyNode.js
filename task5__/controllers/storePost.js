//modules
const { validationResult } = require('express-validator');

module.exports = (req, res) => {
    //initialize
    postErrorMessage = [];

    //errorMessage
    const errors = validationResult(req);

    //errorExist
    if (!errors.isEmpty()) {
        postErrorMessage = errors.array();
        return res.redirect('/post');
    }

    //DB
    const con = require('../database/createConnection');
    const sql = 'INSERT INTO contents SET ?';
    con.query(sql, req.body, (err, result, fields) => {
        if (err) throw err;
        res.redirect('/');
    });
};
