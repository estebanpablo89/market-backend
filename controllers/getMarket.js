const MarketModel = require('../model/Market.js');

// @desc    Get single market
// @route   GET /markets/:id
// @access  Public

async function getMarket(request, reply) {
  const market = await MarketModel.findById(request.params.id);
  reply.code(200).send({ success: true, data: market });
}

module.exports = getMarket;
