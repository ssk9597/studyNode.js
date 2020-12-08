module.exports = (req, res) => {
    const id = req.params.id;

    const con = require('../database/createConnection');

    const sql = `UPDATE likes JOIN posts_likes ON likes.id = posts_likes.like_id JOIN posts ON posts.id = posts_likes.post_id JOIN users ON users.id = posts.user_id SET likes.like = likes.like + 1 WHERE posts_likes.like_id = "${id}"
    `;

    con.query(sql, (err, result, fields) => {
        if (err) throw err;
        req.session.likes = 'likes';
        req.session.idNum = id;
        res.redirect('/');
    });
};
