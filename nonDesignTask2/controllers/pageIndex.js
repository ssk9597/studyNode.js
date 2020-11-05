module.exports = (req, res) => {
    if (username) {
        res.render('index', { username: username });
    } else {
        res.redirect('/register');
    }
};
