const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const router = require('./router/routes');

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

app.listen(8080);
