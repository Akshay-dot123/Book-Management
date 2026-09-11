const cartService = require('../services/cart');
const sendResponse = require('../utils/apiResponse');

const getCart = async (req, res, next) => {
  try {
    const cart = await cartService.getCartByUserId(req.user._id);
    return sendResponse(res, 200, true, 'Cart retrieved successfully', { cart });
  } catch (error) {
    next(error);
  }
};

const addToCart = async (req, res, next) => {
  try {
    const { bookId, quantity } = req.body;
    const cart = await cartService.addToCart(req.user._id, bookId, quantity || 1);
    return sendResponse(res, 200, true, 'Item added to cart successfully', { cart });
  } catch (error) {
    next(error);
  }
};

const updateCartItem = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const { quantity } = req.body;
    const cart = await cartService.updateCartItemQuantity(req.user._id, bookId, quantity);
    return sendResponse(res, 200, true, 'Cart updated successfully', { cart });
  } catch (error) {
    next(error);
  }
};

const removeFromCart = async (req, res, next) => {
  try {
    const { bookId } = req.params;
    const cart = await cartService.removeFromCart(req.user._id, bookId);
    return sendResponse(res, 200, true, 'Item removed from cart successfully', { cart });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart
};