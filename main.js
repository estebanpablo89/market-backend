const fastifyImp = require('fastify');
const fastify = fastifyImp({
  logger: true,
});

const connectDB = require('./mongodb-client');
const MarketModel = require('./model/Market.js');

connectDB();

fastify.post('/market', async (request, reply) => {
  console.log(request);
  const market = await MarketModel.create(request.body);

  reply.send({ success: true, data: market });
});

fastify.get('/markets', async (request, reply) => {
  reply.send({ text: 'Get, ' + (request.query.name || 'Friend') });
});

module.exports = fastify;
