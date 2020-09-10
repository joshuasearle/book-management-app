const mongoose = require('mongoose');
const Author = require('./author-model');

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
    required: true,
    ref: 'Author',
  },
  authorName: {
    firstName: {
      type: String,
      required: true,
      validate: {
        validator: firstName => firstName.length >= 5 && firstName.length <= 15,
        message: 'First name must have between 5, and 15 characters.',
      },
    },
    lastName: {
      type: String,
      validate: {
        validator: lastName => lastName.length >= 5 && lastName.length <= 15,
        message: 'Last name must have between 5, and 15 characters.',
        required: true,
      },
    },
  },
  created: {
    type: Date,
    default: Date.now,
  },
  summary: String,
});

module.exports = mongoose.model('Book', bookSchema);
