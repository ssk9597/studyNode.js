module.exports = (req, res) => {
    const token = req.session.token;

    const con = require('../database/createConnection');
    const sql = 'select * from users';
    const sql2 = 'select * from contents';

    con.query(sql, (err, result, fields) => {
        if (err) throw err;
        con.query(sql2, (err, result, field) => {
            // // console.log(result);
            // for (let i = 0; i < result.length; i++) {
            //     console.log(result[i]);
            // }
            res.render('index', { token: token, contents: result });
        });
    });
};
