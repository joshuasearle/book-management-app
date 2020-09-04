const mongoose = require('mongoose');

const bookSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
    validate: {
      validator: title => title.length > 0,
      message: 'Title cannot be empty',
    },
  },
  isbn: {
    type: String,
    validate: {
      validator: isbn => isbn.length === 13,
      message: 'ISBN must be 13 characters',
    },
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
  },
  created: {
    type: Date,
    default: Date.now,
  },
  summary: String,
});

module.exports = mongoose.model('Book', bookSchema);
