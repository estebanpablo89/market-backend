const createError = require('http-errors');

function validation(
  country,
  currency,
  code_symbol,
  currency_before_price,
  show_cents,
  display
) {
  if (
    !country ||
    !currency ||
    !code_symbol ||
    currency_before_price == null ||
    show_cents == null ||
    !display
  ) {
    throw new createError.BadRequest(
      'Missing fields (country, currency, code_symbol, currency_before_price, show_cents, display)'
    );
  }

  const booleans = ['true', 'false'];

  if (!booleans.includes(currency_before_price)) {
    throw new createError.BadRequest(
      'Incorrect format, currency_before_price & show_cents fields only accepts true or false (with double quotes)'
    );
  }

  if (!booleans.includes(show_cents)) {
    throw new createError.BadRequest(
      'Incorrect format, currency_before_price & show_cents fields only accepts true or false (with double quotes)'
    );
  }

  const displayTypes = ['#,###.##', '#.###,##'];

  if (!displayTypes.includes(display)) {
    throw new createError.BadRequest(
      'Incorrect format, display only accepts #.###,## or #,###.## (with double quotes)'
    );
  }

  const code_symbolTypes = ['symbol', 'code'];

  if (!code_symbolTypes.includes(code_symbol)) {
    throw new createError.BadRequest(
      'Incorrect format, code_symbol only accepts code or symbol (with double quotes)'
    );
  }
}

module.exports = validation;
