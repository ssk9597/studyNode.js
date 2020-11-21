//modules
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    token = req.session.token;
    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.redirect('/login');
        }
        req.decoded = decoded;
        next();
    });
};
