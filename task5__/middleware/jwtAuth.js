//modules
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (!token) {
        // return res.sendStatus(403);
        return res.redirect('/login');
    }

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            // return res.sendStatus(403);
            return res.redirect('/login');
        }
        req.decoded;
        next();
    });
};
