//modules
const mysql = require('mysql');

module.exports = (req, res) => {
    const con = require('../database/createConnection');
    const sql = 'select * from users';

    con.query(sql, (err, result, fields) => {
        if (err) throw err;
        if (activeUser) {
            res.render('index', { users: result });
        } else {
            res.redirect('/login');
        }
    });
};
