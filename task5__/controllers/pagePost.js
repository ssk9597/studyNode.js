module.exports = (req, res) => {
    const token = req.session.token;
    res.render('post', { token: token });
};
