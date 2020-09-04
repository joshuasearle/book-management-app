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

const findAuthorByName = async (first, last) => {
  return await Author.where({
    'name.firstName': first,
    'name.lastName': last,
  });
};

const addBook = async (title, author, isbn, created, summary) => {
  // Get authors with same name
  const authors = await findAuthorByName(author.first, author.last);

  if (authors.length === 0) throw new Error('Author does not exist.');

  // Create book fields
  const bookFields = {
    _id: new mongoose.Types.ObjectId(),
    title: title,
    author: authors[0]._id,
  };

  if (isbn) bookFields.isbn = isbn;
  if (created) bookFields.created = created;
  if (summary) bookFields.summary = summary;

  // Create book and save
  const newBook = new Book(bookFields);
  const saveResult = await newBook.save();
  return saveResult;
};

const updateBook = async (id, title, author, created, summary) => {
  const authors = await findAuthorByName(author.first, author.last);
  if (authors.length === 0) throw new Error('Author does not exist.');

  // Create book fields
  const bookFields = {
    title: title,
    author: authors[0]._id,
  };

  if (created) bookFields.created = created;
  if (summary) bookFields.summary = summary;

  return await Book.updateOne({ _id: id }, { $set: { ...bookFields } });
};

const removeBookByIsbn = async isbn => {
  return await Book.deleteMany({ isbn: isbn });
};

const searchIsbnAuthor = async (isbn, author) => {
  const books = await Book.find().populate('author');
  return books.filter(book => {
    console.log(book.author.name, author);
    return (
      book.isbn === String(isbn) ||
      (book.author.name.firstName === author.firstName &&
        book.author.name.lastName === author.lastName)
    );
  });
};

module.exports = {
  findBooks,
  addBook,
  findBookById,
  findAuthorById,
  updateBook,
  removeBookByIsbn,
  searchIsbnAuthor,
};
