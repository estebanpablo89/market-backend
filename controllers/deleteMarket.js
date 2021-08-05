const MarketModel = require('../model/Market.js');

// @desc    Delete market
// @route   DELETE /market/:id
// @access  Public

async function deleteMarket(request, reply) {
  const market = await MarketModel.findById(request.params.id);

  if (!market) {
    reply.code(404).send({
      error: `No market found with id: ${request.params.id}`,
    });
  }

  await MarketModel.findByIdAndDelete(request.params.id);

  reply.send({ success: true, data: {} });
}

module.exports = deleteMarket;
