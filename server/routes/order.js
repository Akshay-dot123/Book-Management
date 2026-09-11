const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const validate = require('../middleware/validation');
const { protect } = require('../middleware/auth');

router.use(protect);

router.post('/', validate, orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/:id', orderController.getOrderById);

module.exports = router;