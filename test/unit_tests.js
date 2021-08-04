const { assert } = require('chai');
const validation = require('../utils/validation');

const validMarket = {
  country: 'Portugal',
  currency: 'CAD',
  code_symbol: 'symbol',
  currency_before_price: 'true',
  show_cents: 'true',
  display: '#.###,##',
};

describe('Validation', () => {
  it('throws error if MarketObject is incomplete', () => {
    assert.throw(() => {
      validation({
        country: 'Portugal',
        currency: 'CAD',
        code_symbol: 'symbol',
        currency_before_price: 'true',
        show_cents: 'true',
      });
    }, Error);
  });
  it('throws error if country in MarketObject is incorrect', () => {
    assert.throw(() => {
      validation({
        country: 'Ecuadordaslkjf',
        currency: 'CAD',
        code_symbol: 'symbol',
        currency_before_price: 'true',
        show_cents: 'true',
        display: '#.###,#',
      });
    }, Error);
  });
  it('throws error if currency_before_price in MarketObject is not boolean', () => {
    assert.throw(() => {
      validation({
        country: 'Portugal',
        currency: 'CAD',
        code_symbol: 'symbol',
        currency_before_price: 'klasfd8',
        show_cents: 'true',
        display: '#.###,#',
      });
    }, Error);
  });
  it('throws error if show_cents in MarketObject is not boolean', () => {
    assert.throw(() => {
      validation({
        country: 'Portugal',
        currency: 'CAD',
        code_symbol: 'symbol',
        currency_before_price: 'klasfd8',
        show_cents: 'kshadsk',
        display: '#.###,#',
      });
    }, Error);
  });

  it('throws error if display in MarketObject is not correct', () => {
    assert.throw(() => {
      validation({
        country: 'Portugal',
        currency: 'CAD',
        code_symbol: 'symbol',
        currency_before_price: 'true',
        show_cents: 'true',
        display: '#.#jkhg##',
      });
    }, Error);
  });
  it('throws error if code_symbol in market is not correct', () => {
    assert.throw(() => {
      validation({
        country: 'Portugal',
        currency: 'CAD',
        code_symbol: 'lkjl',
        currency_before_price: 'true',
        show_cents: 'true',
        display: '#,###.##',
      });
    }, Error);
  });
});
