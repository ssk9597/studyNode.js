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
    const sql =
        'INSERT INTO posts SET ? SELECT * FROM posts JOIN users ON posts.user_id = users.id';
    con.query(sql, req.body, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
        res.redirect('/');
    });
};
