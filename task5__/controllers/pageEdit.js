module.exports = (req, res) => {
    const token = req.session.token;

    const con = require('../database/createConnection');
    const sql = `SELECT * FROM users JOIN posts ON users.id = posts.user_id`;

    con.query(sql, (err, result, fields) => {
        if (err) throw err;
        for (let i = 0; i < result.length; i++) {
            if (result[i].id == req.params.id) {
                res.render('edit', {
                    errorMessage: postErrorMessage,
                    token: token,
                    post: result[i],
                });
            }
        }
    });
};
