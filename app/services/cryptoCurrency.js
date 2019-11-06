const error = require('../errors');
const { CryptoCurrency } = require('../models');
const servicesUser = require('../services/users');
const request = require('request-promise');
const config = require('../../config');
const { apikey, url } = config.common.apiBraveNewCoin;

const addCryptoCurrency = data =>
  CryptoCurrency.create(data)
    .then(() => 'correctly')
    .catch(err => {
      throw error.databaseError(err.message);
    });

const getListCryptoCurrency = userId =>
  CryptoCurrency.findAndCountAll({
    where: { userId },
    attributes: ['id', 'cryptoId', 'name']
  }).catch(err => {
    throw error.databaseError(err.message);
  });
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
const getListcryptoCurrencys = (cryptoCurrencys, preferredCurrency) =>
  Promise.all(
    cryptoCurrencys.rows.map(element => {
      const urlApi = `${url}ticker?coin=${element.cryptoId}&show=${preferredCurrency}`;
      return getApi(urlApi).catch(err => {
        throw error.braveNewCoinApiError(err.message);
      });
    })
  );

exports.getCryptoCurrency = async ({ decode }) => {
  const user = await servicesUser.findOneUser(decode.userName);
  const cryptoCurrencys = await getListCryptoCurrency(user.id);
  if (cryptoCurrencys.count > 0) {
    return getListcryptoCurrencys(cryptoCurrencys, user.preferredCurrency);
  }
  return [];
};

exports.addCryptoCurrency = req => {
  try {
    return addCryptoCurrency({
      userId: req.userId,
      name: req.name,
      cryptoId: req.cryptoId
    });
  } catch (err) {
    throw err;
  }
};

exports.findOneCryptoCurrency = (cryptoId, userId) =>
  CryptoCurrency.findOne({
    where: { cryptoId, userId },
    attributes: ['id']
  }).catch(err => {
    throw error.databaseError(err.message);
  });
