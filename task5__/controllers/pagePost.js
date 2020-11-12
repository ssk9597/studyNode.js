module.exports = (req, res) => {
    if (activeUser) {
        res.render('post.ejs');
    } else {
        res.redirect('/login');
    }
};
