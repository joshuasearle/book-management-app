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
    type: String,
    validate: {
      validator: author => author.length >= 5 && author <= 15,
      message: 'Author name must be between 5 and 15 characters.',
    },
  },
  created: {
    type: Date,
    default: Date.now,
  },
  summary: String,
});

module.exports = mongoose.model('Book', bookSchema);
