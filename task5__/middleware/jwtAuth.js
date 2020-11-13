//modules
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log('req.headers');
    console.log(req.headers);
    console.log(req.body);
    const token = req.body.token || req.query.token || req.headers['x-access-token'];
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
