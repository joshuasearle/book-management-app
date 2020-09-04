const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');

const app = express();

// Configure ejs
app.engine('html', ejs.renderFile);
app.set('view engine', 'html');

// Add post request url decoding
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(8080);
