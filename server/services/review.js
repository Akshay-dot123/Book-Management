const Review = require('../models/Review');
const Book = require('../models/Book');

const updateBookRatingStats = async (bookId) => {
  const reviews = await Review.find({ book: bookId });
  const reviewCount = reviews.length;
  
  let averageRating = 0;
  if (reviewCount > 0) {
    const sum = reviews.reduce((acc, item) => acc + item.rating, 0);
    averageRating = Number((sum / reviewCount).toFixed(1));
  }

  await Book.findByIdAndUpdate(bookId, {
    averageRating,
    reviewCount
  });
};

const getReviewsByBookId = async (bookId) => {
  const book = await Book.findById(bookId);
  if (!book) {
    const error = new Error('Book not found.');
    error.statusCode = 404;
    throw error;
  }

  const reviews = await Review.find({ book: bookId })
    .populate('user', 'name')
    .sort({ createdAt: -1 });

  return reviews;
};

const createReview = async (userId, bookId, { rating, comment }) => {
  const book = await Book.findById(bookId);
  if (!book) {
    const error = new Error('Book not found.');
    error.statusCode = 404;
    throw error;
  }

  // Check if user already reviewed this book
  const existingReview = await Review.findOne({ user: userId, book: bookId });
  if (existingReview) {
    const error = new Error('You have already reviewed this book. You can edit your existing review instead.');
    error.statusCode = 400;
    throw error;
  }

  const review = await Review.create({
    user: userId,
    book: bookId,
    rating,
    comment
  });

  // Recalculate book stats
  await updateBookRatingStats(bookId);

  return review.populate('user', 'name');
};

const updateReview = async (reviewId, userId, { rating, comment }) => {
  const review = await Review.findById(reviewId);
  if (!review) {
    const error = new Error('Review not found.');
    error.statusCode = 404;
    throw error;
  }

  // Verify ownership
  if (review.user.toString() !== userId.toString()) {
    const error = new Error('Not authorized to update this review.');
    error.statusCode = 403;
    throw error;
  }

  if (rating !== undefined) review.rating = rating;
  if (comment !== undefined) review.comment = comment;

  await review.save();

  // Recalculate book stats
  await updateBookRatingStats(review.book);

  return review.populate('user', 'name');
};

const deleteReview = async (reviewId, userId) => {
  const review = await Review.findById(reviewId);
  if (!review) {
    const error = new Error('Review not found.');
    error.statusCode = 404;
    throw error;
  }

  // Verify ownership
  if (review.user.toString() !== userId.toString()) {
    const error = new Error('Not authorized to delete this review.');
    error.statusCode = 403;
    throw error;
  }

  const bookId = review.book;
  await review.deleteOne();

  // Recalculate book stats
  await updateBookRatingStats(bookId);

  return { message: 'Review deleted successfully' };
};

module.exports = {
  getReviewsByBookId,
  createReview,
  updateReview,
  deleteReview
};