const express = require('express');
const database = require('../models/database');

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
    await database.addBook(title, {
      first: authorFirst,
      last: authorLast,
      isbn,
      created,
      summary,
    });
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
    const book = database.findBookById(id);
    res.render('single-book-update.ejs', { path: '/update-book', ...book });
  } catch (e) {
    res.render('error.ejs', { path: '/error', message: e.message });
  }
});

router.use('/', (req, res) => res.render('404.ejs', { path: '/404' }));

module.exports = router;
