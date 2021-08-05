const mongoose = require('mongoose');

const model = mongoose.model('Currency', {
  name: {
    type: String,
  },
});

module.exports = model;
