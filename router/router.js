const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.render('index.ejs', { path: '/' }));

router.get('/books', (req, res) => {
  books.getBooks((err, result) => {
    if (err) console.log(err);
    res.render('books.ejs', { path: '/books', books: result });
  });
});

router.use('/', (req, res) => res.render('404.ejs', { path: '/404' }));

module.exports = router;
