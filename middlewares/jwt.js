// middleware/auth.js

const jwt = require('jsonwebtoken');
const authConfig = require('../configs/auth.config'); 

module.exports = (req, res, next) => {
    const token = req.headers['accessToken'];
    if (!token) {
        return res.status(403).send({ message: 'No token provided' });
    }

    jwt.verify(token, authConfig.secretKey, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    });
};