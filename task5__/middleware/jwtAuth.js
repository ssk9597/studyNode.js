//modules
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log('-----------------');
    console.log('jwtAuth');
    console.log(req.headers);
    console.log(req.headers.token);
    console.log('-----------------');

    const token = req.headers.token;
    if (!token) {
        return res.redirect('/login');
    }

    jwt.verify(token, 'secret', (err, decoded) => {
        if (err) {
            return res.redirect('/login');
        }
        console.log(decoded);
        req.decoded = decoded;
        next();
    });
};
