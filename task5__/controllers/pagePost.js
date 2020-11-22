module.exports = (req, res) => {
    const token = req.session.token;
    res.render('post', { errorMessage: postErrorMessage, token: token });
};
