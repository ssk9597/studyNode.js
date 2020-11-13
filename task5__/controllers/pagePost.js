module.exports = (req, res) => {
    if (activeUser) {
        res.render('post');
    } else {
        res.redirect('/login');
    }
};
