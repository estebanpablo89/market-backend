const CurrencyModel = require('../model/Currency.js');

// @desc    Get currencies
// @route   GET /currencies
// @access  Public

async function getCurrencies(request, reply) {
  const currencies = await CurrencyModel.find({});
  reply.code(200).send({ success: true, data: currencies });
}

module.exports = getCurrencies;
