const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Book = require('../models/Book');

const createOrder = async (userId, shippingAddress) => {
  // 1. Fetch user cart
  const cart = await Cart.findOne({ user: userId }).populate('items.book');
  if (!cart || cart.items.length === 0) {
    const error = new Error('Your cart is empty.');
    error.statusCode = 400;
    throw error;
  }

  let totalAmount = 0;
  const orderItems = [];

  // 2. Validate stock and prepare order items
  for (const item of cart.items) {
    const book = item.book;
    if (!book) {
      const error = new Error('One or more books in your cart no longer exist.');
      error.statusCode = 404;
      throw error;
    }

    if (book.stock < item.quantity) {
      const error = new Error(`Insufficient stock for "${book.title}". Available: ${book.stock}, Requested: ${item.quantity}`);
      error.statusCode = 400;
      throw error;
    }

    const itemPrice = book.price;
    totalAmount += itemPrice * item.quantity;

    orderItems.push({
      book: book._id,
      title: book.title,
      quantity: item.quantity,
      price: itemPrice
    });
  }

  // 3. Create the Order
  const order = await Order.create({
    user: userId,
    items: orderItems,
    shippingAddress,
    totalAmount: Number(totalAmount.toFixed(2)),
    status: 'Confirmed' // Mock order auto-confirmed
  });

  // 4. Decrement stock for each purchased book
  for (const item of orderItems) {
    await Book.findByIdAndUpdate(item.book, {
      $inc: { stock: -item.quantity }
    });
  }

  // 5. Clear user's cart
  cart.items = [];
  await cart.save();

  return order;
};

const getOrdersByUserId = async (userId) => {
  const orders = await Order.find({ user: userId }).sort({ createdAt: -1 });
  return orders;
};

const getOrderById = async (orderId, userId) => {
  const order = await Order.findById(orderId);
  if (!order) {
    const error = new Error('Order not found.');
    error.statusCode = 404;
    throw error;
  }

  // Ensure user owns this order
  if (order.user.toString() !== userId.toString()) {
    const error = new Error('Not authorized to access this order.');
    error.statusCode = 403;
    throw error;
  }

  return order;
};

module.exports = {
  createOrder,
  getOrdersByUserId,
  getOrderById
};