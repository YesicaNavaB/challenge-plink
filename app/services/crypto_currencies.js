const error = require('../errors');
const { CryptoCurrency } = require('../models');
const request = require('request-promise');
const config = require('../../config');
const { apikey, url } = config.common.apiBraveNewCoin;
const { responseApiGetList } = require('../serializers/crypto_currencies');
const { orderArrayByField } = require('../helpers/array_fields');

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

const getListCurrencies = (cryptoCurrencies, preferredCurrency) =>
  Promise.all(
    cryptoCurrencies.rows.map(element => {
      const urlApi = `${url}ticker?coin=${element.cryptoId}&show=${preferredCurrency}`;
      return getApi(urlApi).catch(err => {
        throw error.braveNewCoinApiError(err.message);
      });
    })
  );

const getApiData = async req => {
  const cryptoCurrencies = await CryptoCurrency.getAllByUserId(req.userId);
  if (cryptoCurrencies.count > 0) {
    return getListCurrencies(cryptoCurrencies, req.preferredCurrency);
  }
  return [];
};

exports.getListCryptoCurrencies = async req => {
  const response = await getApiData(req);
  return responseApiGetList(response);
};

exports.getListTopCryptoCurrencies = async req => {
  const response = await getApiData(req.body.decode);
  const mapResponse = responseApiGetList(response);
  const order = orderArrayByField(mapResponse, req.query.order).slice(0, 3);
  return order;
};

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
