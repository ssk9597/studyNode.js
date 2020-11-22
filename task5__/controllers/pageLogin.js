module.exports = (req, res) => {
    const token = req.session.token;
    res.render('login', { errorMessage: loginErrorMessage, token: token });
};
