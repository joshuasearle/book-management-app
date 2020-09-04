const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {
    firstName: {
      type: String,
      required: true,
      validate: {
        validator: firstName => firstName.length > 0,
        message: 'First name cannot be empty',
      },
    },
    lastName: {
      type: String,
    },
  },
  dob: Date,
  address: {
    state: {
      type: String,
      validate: {
        validator: state => state.length === 2 || state.length === 3,
        message: 'State must be 2 or 3 characters.',
      },
    },
    suburb: String,
    street: String,
    unit: Number,
  },
  numBooks: {
    type: Number,
    default: 0,
    validate: {
      validator: numBooks => numBooks > 0,
      message: 'Author needs at least one book.',
    },
  },
});

module.exports = mongoose.model('Author', authorSchema);
