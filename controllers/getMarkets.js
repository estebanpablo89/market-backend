const MarketModel = require('../model/Market.js');

// @desc    Get markets
// @route   GET /markets
// @access  Public

async function getMarkets(request, reply) {
  const markets = await MarketModel.find({});
  reply.code(200).send({ success: true, data: markets });
}

module.exports = getMarkets;
