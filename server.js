const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const router = require('./router/router');

const app = express();

// Configure ejs
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// Add post request url decoding
app.use(bodyParser.urlencoded({ extended: true }));

// Add static assets
app.use(express.static('public'));

// Send requests to router
app.use('/', router);

// Connect to Db, and start server
const url = 'mongodb://localhost:27017/fit2095';
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.once('open', () => {
  app.listen(8080);
});
