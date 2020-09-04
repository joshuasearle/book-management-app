const express = require('express');

const router = express.Router();

router.get('/', (req, res) => res.render('index.ejs', { path: '/' }));

router.use('/', (req, res) => res.render('404.ejs', { path: '/404' }));

module.exports = router;
