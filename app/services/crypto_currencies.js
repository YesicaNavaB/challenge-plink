const error = require('../errors');
const { CryptoCurrency } = require('../models');
const request = require('request-promise');
const config = require('../../config');
const { apikey, url } = config.common.apiBraveNewCoin;

const getApi = urlApi => {
  const options = {
    uri: urlApi,
    headers: {
      'X-RapidAPI-Key': apikey
    },
    json: true
  };
  return request(options).catch(err => {
    throw error.braveNewCoinApiError(err.message);
  });
};

exports.getListcryptoCurrencies = (cryptoCurrencies, preferredCurrency) =>
  Promise.all(
    cryptoCurrencies.rows.map(element => {
      const urlApi = `${url}ticker?coin=${element.cryptoId}&show=${preferredCurrency}`;
      return getApi(urlApi).catch(err => {
        throw error.braveNewCoinApiError(err.message);
      });
    })
  );

exports.addCryptoCurrency = req => {
  try {
    return CryptoCurrency.createModel({
      userId: req.userId,
      name: req.name,
      cryptoId: req.cryptoId
    }).catch(err => {
      throw error.databaseError(err.message);
    });
  } catch (err) {
    throw err;
  }
};

exports.validateCryptoCurrency = cryptoId => {
  const urlApi = `${url}ticker?coin=${cryptoId}`;
  return getApi(urlApi)
    .then(response => response)
    .catch(err => {
      throw error.braveNewCoinApiError(err.message);
    });
};
