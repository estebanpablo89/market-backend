const CountryModel = require('../model/Country.js');

// @desc    Get countries
// @route   GET /countries
// @access  Public

async function getCountries(request, reply) {
  const countries = await CountryModel.find({});
  reply.code(200).send({ success: true, data: countries });
}

module.exports = getCountries;
