const orderService = require('../services/order');
const sendResponse = require('../utils/apiResponse');

const createOrder = async (req, res, next) => {
  try {
    const { shippingAddress } = req.body;
    const order = await orderService.createOrder(req.user._id, shippingAddress);
    return sendResponse(res, 201, true, 'Order placed successfully', { order });
  } catch (error) {
    next(error);
  }
};

const getOrders = async (req, res, next) => {
  try {
    const orders = await orderService.getOrdersByUserId(req.user._id);
    return sendResponse(res, 200, true, 'Orders retrieved successfully', { orders });
  } catch (error) {
    next(error);
  }
};

const getOrderById = async (req, res, next) => {
  try {
    const order = await orderService.getOrderById(req.params.id, req.user._id);
    return sendResponse(res, 200, true, 'Order details retrieved successfully', { order });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
  getOrders,
  getOrderById
};