const mongoose = require('mongoose');
const validator = require('validator');

const model = mongoose.model('Market', {
  country: {
    type: String,
    required: true,
    validate: {
      validator(country) {
        return validator.isAlphanumeric(country);
      },
    },
  },
  currency: {
    type: String,
    required: true,
    validate: {
      validator(currency) {
        return validator.isAlphanumeric(currency);
      },
    },
  },
  code_symbol: {
    type: String,
    required: true,
    validate: {
      validator(code_symbol) {
        return validator.isAlphanumeric(code_symbol);
      },
    },
  },
  currency_before_price: {
    type: String,
    required: true,
    validate: {
      validator(currency_before_price) {
        return validator.isBoolean(currency_before_price);
      },
    },
  },
  show_cents: {
    type: String,
    required: true,
    validate: {
      validator(show_cents) {
        return validator.isBoolean(show_cents);
      },
    },
  },
});

module.exports = model;
