const bookService = require('../services/book');
const sendResponse = require('../utils/apiResponse');

const getBooks = async (req, res, next) => {
  try {
    const result = await bookService.getFilteredBooks(req.query);
    return sendResponse(res, 200, true, 'Books retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(req.params.id);
    return sendResponse(res, 200, true, 'Book details retrieved successfully', { book });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getBooks,
  getBookById
};