const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth');
const { registerValidator, loginValidator } = require('../validators/auth');
const validate = require('../middleware/validation');
const { protect } = require('../middleware/auth');

router.post('/register', registerValidator, validate, authController.register);
router.post('/login', loginValidator, validate, authController.login);
router.post('/logout', protect, authController.logout);
router.get('/me', protect, authController.getMe);

module.exports = router;