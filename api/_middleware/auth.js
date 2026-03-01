const jwt = require('jsonwebtoken');

module.exports = function (req, res) {
    const token = req.headers['x-auth-token'];

    if (!token) {
        res.status(401).json({ message: 'No token, authorization denied' });
        return null;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded;
    } catch (err) {
        res.status(401).json({ message: 'Token is not valid' });
        return null;
    }
};
