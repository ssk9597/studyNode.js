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
    const username = req.session.username;
    const sql = `INSERT INTO posts (title, content,user_id) SELECT "${req.body.title}", "${req.body.content}", id FROM users WHERE users.username = "${username}"`;

    con.query(sql, req.body, (err, result, fields) => {
        if (err) throw err;
        res.redirect('/');
    });
};
