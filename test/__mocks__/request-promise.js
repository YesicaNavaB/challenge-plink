const { listCryptoCurrency, listDigitalSymbols } = require('../fixture/listCryptoCurrencys');

module.exports = jest.fn(param => {
  const search = param.uri.search('digital-currency-symbols');
  if (search === -1) {
    return Promise.resolve(listCryptoCurrency);
  }
  return Promise.resolve(listDigitalSymbols);
});
