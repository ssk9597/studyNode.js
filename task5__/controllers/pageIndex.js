module.exports = (req, res) => {
    const token = req.session.token;

    const con = require('../database/createConnection');
    const sql = 'select * from users';

    con.query(sql, (err, result, fields) => {
        if (err) throw err;
        res.render('index', { token: token });
    });
};
