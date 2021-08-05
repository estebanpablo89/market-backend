const fastify = require('fastify')({ logger: true });

require('dotenv').config();

// controllers
const getMarkets = require('./controllers/getMarkets');
const getMarket = require('./controllers/getMarket');
const createMarket = require('./controllers/createMarket');
const updateMarket = require('./controllers/updateMarket');
const deleteMarket = require('./controllers/deleteMarket');
const getCountries = require('./controllers/getCountries');
const getCurrencies = require('./controllers/getCurrencies');

// db
const connectDB = require('./mongodb-client');

connectDB();

// markets
fastify.get('/markets', getMarkets);
fastify.post('/market', createMarket);
fastify.get('/market/:id', getMarket);
fastify.put('/market/:id', updateMarket);
fastify.delete('/market/:id', deleteMarket);

// countries
fastify.get('/countries', getCountries);

// currencies
fastify.get('/currencies', getCurrencies);

module.exports = fastify;
