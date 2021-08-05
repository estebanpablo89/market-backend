const MarketModel = require('../model/Market.js');
const CurrencyModel = require('../model/Currency.js');
const CountryModel = require('../model/Country.js');

const createError = require('http-errors');
const validation = require('../utils/validation');

// @desc    Create market
// @route   POST /market
// @access  Public

async function createMarket(request, reply) {
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

  let currencyCode = [];

  try {
    currencyCode = await CurrencyModel.find({ name: currency });
  } catch (error) {
    throw new createError.InternalServerError(error);
  }

  if (currencyCode.length === 0) {
    throw new createError.BadRequest(
      'Incorrect currency, supported format values are: USD, CAD, EUR, etc... (with double quotes) for supported values please visit /dev/currencies'
    );
  }

  let countries = [];

  try {
    countries = await CountryModel.find({ name: country });
  } catch (error) {
    throw new createError.InternalServerError(error);
  }

  if (countries.length === 0) {
    throw new createError.BadRequest(
      'Incorrect country, supported format values are: United States, Ecuador, Venezuela, Spain, etc... (with double quotes) for supported values please visit /dev/countries'
    );
  }

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
        'Market already exists, try a different country / currency combination or search id in all markets to update the data'
      );
    }
  }

  const market = await MarketModel.create(request.body);
  reply.code(201).send({ success: true, data: market });
}

module.exports = createMarket;
