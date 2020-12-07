module.exports = (req, res) => {
    const token = req.session.token;
    const username = req.session.username;
    const likes = req.session.likes;
    console.log(likes);

    const con = require('../database/createConnection');
    const sql =
        'SELECT * FROM users JOIN posts ON users.id = posts.user_id JOIN posts_likes ON posts.id = posts_likes.post_id JOIN likes ON posts_likes.like_id = likes.id';

    con.query(sql, (err, result, fields) => {
        if (err) throw err;
        console.log(result);
        res.render('index', {
            token,
            username,
            contents: result,
            likes,
        });
    });
};
