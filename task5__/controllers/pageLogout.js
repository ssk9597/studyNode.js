module.exports = (req, res) => {
    req.session.destroy(() => {
        // activeUser = '';
        res.redirect('/login');
    });
};
