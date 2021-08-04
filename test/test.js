const url = 'http://localhost:3000/dev';
const request = require('supertest')(url);
const expect = require('chai').expect;

const validMarket = {
  country: 'Portugal',
  currency: 'CAD',
  code_symbol: 'symbol',
  currency_before_price: 'true',
  show_cents: 'true',
  display: '#.###,##',
};

const postMarket = (market = validMarket) => {
  return request.post('/market').send(market);
};

const deleteMarket = id => {
  return request.delete(`/market/${id}`);
};

describe('Market', () => {
  it('returns 201 OK with data when a market is created', async () => {
    const response = await postMarket();
    expect(response.status).to.equal(201);
    expect(response.body.data).to.have.property('_id');
    expect(response.body.data).to.have.property('country');
    expect(response.body.data).to.have.property('currency');
    await deleteMarket(response.body.data._id);
  });

  it('returns saved market from database', async () => {
    const response = await postMarket();
    const market = await request.get(`/market/${response.body.id}`);
    expect(response.body.id).to.equal(market.body.id);
    await deleteMarket(response.body.data._id);
  });

  it('returns 400 and Error message if market (country/currency) is already in database', async () => {
    const response1 = await postMarket();
    const response2 = await postMarket();
    expect(response2.status).to.equal(400);
    expect(response2.body.message).to.equal(
      'Market already exists, try a different country / currency combination or search id in all markets to update the data'
    );
    await deleteMarket(response1.body.data._id);
  });

  it('returns 400 status and Missing fields message if a value in market is falsy', async () => {
    const response = await postMarket({
      country: 'Portugal',
      currency: 'CAD',
      code_symbol: 'symbol',
      currency_before_price: 'true',
    });
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal(
      'Missing fields (country, currency, code_symbol, currency_before_price, show_cents, display)'
    );
  });

  it('returns 400 status and Incorrect currency message if currency in market is incorrect', async () => {
    const response = await postMarket({
      country: 'Portugal',
      currency: 'lh4jk32h',
      code_symbol: 'symbol',
      currency_before_price: 'true',
      show_cents: 'true',
      display: '#.###,#',
    });
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal(
      'Incorrect currency, supported format values are: USD, CAD, EUR, etc... (with double quotes)'
    );
  });

  it('returns 400 status and Incorrect country message if country in market is incorrect', async () => {
    const response = await postMarket({
      country: 'Ecuadordaslkjf',
      currency: 'CAD',
      code_symbol: 'symbol',
      currency_before_price: 'true',
      show_cents: 'true',
      display: '#.###,#',
    });
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal(
      'Incorrect country, supported format values are: United States, Ecuador, Venezuela, Spain, etc... (with double quotes)'
    );
  });

  it('returns 400 status and Incorrect format message if currency_before_price in market is not boolean', async () => {
    const response = await postMarket({
      country: 'Portugal',
      currency: 'CAD',
      code_symbol: 'symbol',
      currency_before_price: 'klasfd8',
      show_cents: 'true',
      display: '#.###,#',
    });
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal(
      'Incorrect format, currency_before_price & show_cents fields only accepts true or false (with double quotes)'
    );
  });

  it('returns 400 status and Incorrect format message if show_cents in market is not boolean', async () => {
    const response = await postMarket({
      country: 'Portugal',
      currency: 'CAD',
      code_symbol: 'symbol',
      currency_before_price: 'klasfd8',
      show_cents: 'kshadsk',
      display: '#.###,#',
    });
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal(
      'Incorrect format, currency_before_price & show_cents fields only accepts true or false (with double quotes)'
    );
  });

  it('returns 400 status and Incorrect format message if display in market is not correct', async () => {
    const response = await postMarket({
      country: 'Portugal',
      currency: 'CAD',
      code_symbol: 'symbol',
      currency_before_price: 'true',
      show_cents: 'true',
      display: '#.#jkhg##',
    });
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal(
      'Incorrect format, display only accepts #.###,## or #,###.## (with double quotes)'
    );
  });

  it('returns 400 status and Incorrect format message if code_symbol in market is not correct', async () => {
    const response = await postMarket({
      country: 'Portugal',
      currency: 'CAD',
      code_symbol: 'lkjl',
      currency_before_price: 'true',
      show_cents: 'true',
      display: '#,###.##',
    });
    expect(response.status).to.equal(400);
    expect(response.body.message).to.equal(
      'Incorrect format, code_symbol only accepts code or symbol (with double quotes)'
    );
  });
});
