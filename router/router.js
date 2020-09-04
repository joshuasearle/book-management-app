const express = require('express');

const Book = require('../models/book.js');
const Author = require('../models/author.js');

const router = express.Router();

router.get('/', (req, res) => res.render('index.ejs', { path: '/' }));

router.get('/books', (req, res) => {
  Book.find().then(books => {
    res.render('books.ejs', { path: '/books', books: books });
  });
});

router.use('/', (req, res) => res.render('404.ejs', { path: '/404' }));

module.exports = router;
