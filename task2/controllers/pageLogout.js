module.exports = (req, res) => {
    req.session.destroy(() => {
        username = '';
        res.redirect('/register');
    });
};
