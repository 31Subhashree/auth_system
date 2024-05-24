module.exports = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: err.message });
};

// middleware/validate.js
const { body, validationResult } = require('express-validator');

exports.validateUser = [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];
