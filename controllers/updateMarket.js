const MarketModel = require('../model/Market.js');
const CurrencyModel = require('../model/Currency.js');
const CountryModel = require('../model/Country.js');

const createError = require('http-errors');
const validation = require('../utils/validation');

// @desc    Update market
// @route   PUT /markets/:id
// @access  Public

async function updateMarket(request, reply) {
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
}

module.exports = updateMarket;
