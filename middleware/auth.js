const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).json({ message: 'Access denied.' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

exports.isAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') return res.status(403).json({ message: 'Access denied.' });
    next();
};

exports.canViewProfile = (req, res, next) => {
    if (req.user.role === 'admin') return next();
    if (req.profile.profileVisibility === 'public') return next();
    res.status(403).json({ message: 'Access denied.' });
};
