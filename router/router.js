const express = require('express');
const database = require('../models/database');
const util = require('../util/util');
const router = express.Router();

router.get('/', (req, res) => res.render('index.ejs', { path: '/' }));

router.get('/books', async (req, res) => {
  const books = await database.findBooks();
  res.render('books.ejs', { path: '/books', books: books });
});

router.get('/add-book', (req, res) => {
  res.render('add-book.ejs', { path: '/add-book' });
});

router.post('/add-book', async (req, res) => {
  const { title, isbn, created, summary, authorFirst, authorLast } = req.body;
  try {
    await database.addBook(
      title,
      { first: authorFirst, last: authorLast },
      isbn,
      created,
      summary
    );
    res.redirect('/books');
  } catch (e) {
    res.render('error.ejs', { path: '/error', message: e.message });
  }
});

router.get('/update-book', async (req, res) => {
  const books = await database.findBooks();
  res.render('update-book.ejs', { path: '/update-book', books: books });
});

router.get('/update-book/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const book = await database.findBookById(id);
    console.log(book);
    res.render('single-book-update.ejs', {
      path: '/update-book',
      book: {
        _id: book._id,
        title: book.title,
        authorName: book.authorName,
        created: util.convertDate(book.created),
        summary: book.summary,
      },
    });
  } catch (e) {
    res.render('error.ejs', { path: '/error', message: e.message });
  }
});

router.post('/update-book/:id', async (req, res) => {
  const id = req.params.id;
  const { title, authorFirst, authorLast, created, summary } = req.body;
  const author = { first: authorFirst, last: authorLast };
  try {
    await database.updateBook(id, title, author, created, summary);
    res.redirect('/books');
  } catch (e) {
    res.render('error.ejs', { path: '/error', message: e.message });
  }
});

router.get('/remove-book', (req, res) =>
  res.render('remove-book.ejs', { path: '/remove-book' })
);

router.post('/remove-book', async (req, res) => {
  const isbn = req.body.isbn;
  await database.removeBookByIsbn(isbn);
  res.redirect('/books');
});

router.get('/search-book', (req, res) => {
  res.render('search.ejs', { path: '/search-book' });
});

router.post('/search-book', async (req, res) => {
  const { isbn, authorFirst, authorLast } = req.body;
  console.log(req.body);
  const books = await database.searchIsbnAuthor(isbn, {
    firstName: authorFirst,
    lastName: authorLast,
  });
  res.render('search-result.ejs', { path: '/search-book', books: books });
});

router.get('/add-author', (req, res) => {
  res.render('add-author.ejs', { path: '/add-author' });
});

router.post('/add-author', async (req, res) => {
  const { authorLast, authorFirst, state, suburb, street, unit } = req.body;
  try {
    await database.addAuthor(
      { authorFirst, authorLast },
      { state, suburb, street, unit }
    );
    res.redirect('/books');
  } catch (e) {
    res.render('error.ejs', { path: '/error', message: e.message });
  }
});

router.use('/', (req, res) => res.render('404.ejs', { path: '/404' }));

module.exports = router;
