const fastify = require('fastify')({ logger: true });
const createError = require('http-errors');
const validation = require('./utils/validation');

require('dotenv').config();

const connectDB = require('./mongodb-client');
const MarketModel = require('./model/Market.js');

connectDB();

// @desc    Get markets
// @route   GET /markets
// @access  Public

fastify.get('/markets', async (request, reply) => {
  const markets = await MarketModel.find({});
  reply.code(201).send({ success: true, data: markets });
});

// @desc    Create market
// @route   POST /market
// @access  Public

fastify.post('/market', async (request, reply) => {
  const {
    country,
    currency,
    code_symbol,
    currency_before_price,
    show_cents,
    display,
  } = request.body;

  validation(
    country,
    currency,
    code_symbol,
    currency_before_price,
    show_cents,
    display
  );

  let existingMarkets;

  try {
    existingMarkets = await MarketModel.find({});
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  for (let i = 0; i < existingMarkets.length; i++) {
    if (
      existingMarkets[i].country === country &&
      existingMarkets[i].currency === currency
    ) {
      throw new createError.BadRequest(
        '{"error": "Market already exists, try a different country/currency combination or search id in all markets to update the data"}'
      );
    }
  }

  const market = await MarketModel.create(request.body);
  reply.code(201).send({ success: true, data: market });
});

// @desc    Get single market
// @route   GET /markets/:id
// @access  Public

fastify.get('/market/:id', async (request, reply) => {
  const market = await MarketModel.findById(request.params.id);
  reply.code(201).send({ success: true, data: market });
});

// @desc    Update market
// @route   PUT /markets/:id
// @access  Public

fastify.put('/market/:id', async (request, reply) => {
  let market = await MarketModel.findById(request.params.id);

  if (!market) {
    reply.code(404).send({
      error: `No market found with id: ${request.params.id}`,
    });
  }

  market = await MarketModel.findByIdAndUpdate(
    request.params.id,
    request.body,
    {
      new: true,
      runValidators: true,
    }
  );

  reply.code(200).send({ success: true, data: market });
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
