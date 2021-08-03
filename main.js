const fastifyImp = require('fastify');
const fastify = fastifyImp({
  logger: true,
});

const connectDB = require('./mongodb-client');
const MarketModel = require('./model/Market.js');

connectDB();

// @desc    Create market
// @route   POST /market
// @access  Public

fastify.post('/market', async (request, reply) => {
  const market = await MarketModel.create(request.body);
  reply.code(201).send({ success: true, data: market });
});

// @desc    Delete market
// @route   DELETE /market/:id
// @access  Public

fastify.delete('/market/:id', async (request, reply) => {
  const market = await MarketModel.findById(request.params.id);

  if (!market) {
    reply.code(404).send({
      error: `No market found with id: ${request.params.id}`,
    });
  }

  await MarketModel.findByIdAndDelete(request.params.id);

  reply.send({ success: true, data: {} });
});

module.exports = fastify;
