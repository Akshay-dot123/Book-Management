const { body } = require('express-validator');

const reviewValidator = [
    body('rating', 'Rating is required and must be an integer between 1 and 5')
        .isInt({ min: 1, max: 5 }),
    body('comment', 'Comment is required and cannot be empty')
        .trim()
        .notEmpty()
];

module.exports = { reviewValidator };