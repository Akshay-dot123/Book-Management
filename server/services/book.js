const Book = require('../models/Book');

const getFilteredBooks = async (query) => {
  // 1. Destructure the search term (and any other filters) from the query
  const { search } = query; 
  
  // 2. Create an empty filter object
  let filter = {};

  // 3. If a search term exists, add a MongoDB regex filter
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: 'i' } }, // 'i' makes it case-insensitive
      { author: { $regex: search, $options: 'i' } }
    ];
  }

  // 4. Fetch books from the database using the filter
  const books = await Book.find(filter);
  
  return books;
};

const getBookById = async (bookId) => {
  const book = await Book.findById(bookId);
  if (!book) {
    const error = new Error('Book not found.');
    error.statusCode = 404;
    throw error;
  }
  return book;
};

module.exports = {
  getFilteredBooks,
  getBookById
};