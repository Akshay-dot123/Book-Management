const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review');
const { reviewValidator } = require('../validators/review');
const validate = require('../middleware/validation');
const { protect } = require('../middleware/auth');

router.get('/books/:bookId', reviewController.getReviews);
router.post('/books/:bookId', protect, reviewValidator, validate, reviewController.createReview);

router.put('/:id', protect, reviewValidator, validate, reviewController.updateReview);
router.delete('/:id', protect, reviewController.deleteReview);

module.exports = router;