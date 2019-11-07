const { listCryptoCurrency, listCryptoCurrencyError } = require('../fixture/list_currencies');

module.exports = jest.fn(param => {
  const search = param.uri.search('coin=YHT');
  if (search !== -1) {
    return Promise.resolve(listCryptoCurrencyError);
  }
  return Promise.resolve(listCryptoCurrency);
});
