module.exports = (req, res) => {
    const token = req.session.token;

    const con = require('../database/createConnection');
    const sql = `SELECT * FROM users JOIN posts ON users.id = posts.user_id`;

    con.query(sql, (err, result, fields) => {
        if (err) throw err;
        result.forEach((val) => {
            if (val.id === Number(req.params.id)) {
                res.render('edit', {
                    errorMessage: postErrorMessage,
                    token: token,
                    post: val,
                });
            }
        });
    });
};
