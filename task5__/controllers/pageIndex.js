module.exports = (req, res) => {
    const token = req.session.token;
    const username = req.session.username;

    const con = require('../database/createConnection');
    const sql = 'SELECT * FROM users JOIN posts ON users.id = posts.user_id';

    con.query(sql, (err, result, fields) => {
        if (err) throw err;
        // console.log(result);
        res.render('index', { token: token, username: username, contents: result });
    });
};
