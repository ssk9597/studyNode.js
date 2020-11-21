//modules
const mysql = require('mysql');

module.exports = (req, res) => {
    console.log('-----------------');
    console.log('pageIndex');
    console.log(req.session);
    console.log(req.headers);
    console.log('-----------------');

    const con = require('../database/createConnection');
    const sql = 'select * from users';

    con.query(sql, (err, result, fields) => {
        if (err) throw err;
        res.render('index');
    });
};
