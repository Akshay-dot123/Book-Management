const reviewService = require('../services/review');
const sendResponse = require('../utils/apiResponse');

const getReviews = async (req, res, next) => {
  try {
    const reviews = await reviewService.getReviewsByBookId(req.params.bookId);
    return sendResponse(res, 200, true, 'Reviews retrieved successfully', { reviews });
  } catch (error) {
    next(error);
  }
};

const createReview = async (req, res, next) => {
  try {
    const review = await reviewService.createReview(req.user._id, req.params.bookId, req.body);
    return sendResponse(res, 201, true, 'Review added successfully', { review });
  } catch (error) {
    next(error);
  }
};

const updateReview = async (req, res, next) => {
  try {
    const review = await reviewService.updateReview(req.params.id, req.user._id, req.body);
    return sendResponse(res, 200, true, 'Review updated successfully', { review });
  } catch (error) {
    next(error);
  }
};

const deleteReview = async (req, res, next) => {
  try {
    await reviewService.deleteReview(req.params.id, req.user._id);
    return sendResponse(res, 200, true, 'Review deleted successfully');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getReviews,
  createReview,
  updateReview,
  deleteReview
};