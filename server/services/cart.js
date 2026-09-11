const Cart = require('../models/Cart');
const Book = require('../models/Book');

const getCartByUserId = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate('items.book');
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
    await cart.populate('items.book');
  }
  return cart;
};

const addToCart = async (userId, bookId, quantity = 1) => {
  const book = await Book.findById(bookId);
  if (!book) {
    const error = new Error('Book not found.');
    error.statusCode = 404;
    throw error;
  }

  if (book.stock < quantity) {
    const error = new Error(`Requested quantity exceeds available stock (${book.stock} available).`);
    error.statusCode = 400;
    throw error;
  }

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }

  const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);

  if (itemIndex > -1) {
    const newQuantity = cart.items[itemIndex].quantity + Number(quantity);
    if (book.stock < newQuantity) {
      const error = new Error(`Total quantity exceeds available stock (${book.stock} available).`);
      error.statusCode = 400;
      throw error;
    }
    cart.items[itemIndex].quantity = newQuantity;
  } else {
    cart.items.push({ book: bookId, quantity: Number(quantity) });
  }

  await cart.save();
  return await cart.populate('items.book');
};

const updateCartItemQuantity = async (userId, bookId, quantity) => {
  const book = await Book.findById(bookId);
  if (!book) {
    const error = new Error('Book not found.');
    error.statusCode = 404;
    throw error;
  }

  if (Number(quantity) <= 0) {
    return removeFromCart(userId, bookId);
  }

  if (book.stock < Number(quantity)) {
    const error = new Error(`Requested quantity exceeds available stock (${book.stock} available).`);
    error.statusCode = 400;
    throw error;
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    const error = new Error('Cart not found.');
    error.statusCode = 404;
    throw error;
  }

  const itemIndex = cart.items.findIndex(item => item.book.toString() === bookId);
  if (itemIndex === -1) {
    const error = new Error('Item not found in cart.');
    error.statusCode = 404;
    throw error;
  }

  cart.items[itemIndex].quantity = Number(quantity);
  await cart.save();
  return await cart.populate('items.book');
};

const removeFromCart = async (userId, bookId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    const error = new Error('Cart not found.');
    error.statusCode = 404;
    throw error;
  }

  cart.items = cart.items.filter(item => item.book.toString() !== bookId);
  await cart.save();
  return await cart.populate('items.book');
};

module.exports = {
  getCartByUserId,
  addToCart,
  updateCartItemQuantity,
  removeFromCart
};