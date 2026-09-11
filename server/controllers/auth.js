const authService = require('../services/auth');
const sendResponse = require('../utils/apiResponse');

const register = async (req, res, next) => {
  try {
    const result = await authService.registerUser(req.body);
    return sendResponse(res, 201, true, 'User registered successfully', result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);
    return sendResponse(res, 200, true, 'Logged in successfully', result);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    return sendResponse(res, 200, true, 'Logged out successfully');
  } catch (error) {
    next(error);
  }
};

const getMe = async (req, res, next) => {
  try {
    // req.user is attached by authMiddleware
    return sendResponse(res, 200, true, 'User profile fetched', { user: req.user });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, logout, getMe };