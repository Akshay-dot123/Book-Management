const { body } = require('express-validator');

const registerValidator = [
    body('name', 'Name is required').trim().notEmpty(),
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password must be at least 6 characters long').isLength({ min: 6 })
];

const loginValidator = [
    body('email', 'Please include a valid email').isEmail(),
    body('password', 'Password is required').exists()
];

module.exports = { registerValidator, loginValidator };