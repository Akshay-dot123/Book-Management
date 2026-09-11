const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cart');
const { protect } = require('../middleware/auth');

router.use(protect);

router.get('/', cartController.getCart);
router.post('/', cartController.addToCart);
router.put('/:bookId', cartController.updateCartItem);
router.delete('/:bookId', cartController.removeFromCart);

module.exports = router;