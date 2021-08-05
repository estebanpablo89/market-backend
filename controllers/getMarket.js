const MarketModel = require('../model/Market.js');

// @desc    Get single market
// @route   GET /markets/:id
// @access  Public

async function getMarket(request, reply) {
  const market = await MarketModel.findById(request.params.id);

  if (!market) {
    reply.code(404).send({
      error: `No market found with id: ${request.params.id}`,
    });
  }

  reply.code(200).send({ success: true, data: market });
}

module.exports = getMarket;
