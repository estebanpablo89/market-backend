const mongoose = require('mongoose');

const model = mongoose.model('Country', {
  name: {
    type: String,
  },
});

module.exports = model;
