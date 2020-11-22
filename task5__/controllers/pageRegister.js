module.exports = (req, res) => {
    const token = req.session.token;
    res.render('register', { errorMessage: registerErrorMessage, token: token });
};
