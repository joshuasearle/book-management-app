const mongoose = require('mongoose');
const Book = require('./book-model');
const Author = require('./author-model');

const findBooks = () => Book.find().populate('author');

const findBookById = async id => {
  const book = await Book.findById(id).populate('author');
  if (!book) throw new Error('Database error.');
  return book;
};

const findAuthorById = async id => {
  const author = await Author.findById(id);
  if (!author) throw new Error('Database error.');
  return author;
};

const addBook = async (title, author, isbn, created, summary) => {
  // Get authors with same name
  const authors = await Author.where({
    'name.firstName': author.first,
    'name.lastName': author.last,
  });

  if (authors.length === 0) throw new Error('Author does not exist.');

  // Create book fields
  const bookFields = {
    _id: new mongoose.Types.ObjectId(),
    title: title,
    authorId: authors[0]._id,
  };
  if (isbn) bookFields.isbn = isbn;
  if (created) bookFields.created = created;
  if (summary) bookFields.summary = created;

  // Create book and save
  const newBook = new Book(bookFields);
  const saveResult = await newBook.save();
  return saveResult;
};

module.exports = { findBooks, addBook, findBookById, findAuthorById };
