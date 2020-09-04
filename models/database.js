const mongoose = require('mongoose');
const Book = require('./book-model');
const Author = require('./author-model');

const findBooks = () => Book.find();

const findBookById = async id => {
  const books = await Book.findById(id);

  if (books.length === 0) throw new Error('Database error.');
  return books[0];
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

module.exports = { findBooks, addBook, findBookById };
