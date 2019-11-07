const servicesCripto = require('../services/crypto_currencies');
const { responseApiGetList } = require('../serializers/crypto_currencies');
const { orderArrayByField } = require('../helpers/array_fields');
const { CryptoCurrency, User } = require('../models');

const getApiData = async ({ userName }) => {
  const user = await User.getOneByUserName(userName);
  const cryptoCurrencies = await CryptoCurrency.getAllByUserId(user.id);
  if (cryptoCurrencies.count > 0) {
    return servicesCripto.getListcryptoCurrencies(cryptoCurrencies, user.preferredCurrency);
  }
  return [];
};

exports.getListCryptoCurrencies = async req => {
  const response = await getApiData(req.decode);
  return responseApiGetList(response);
};

exports.getListTopCryptoCurrencies = async req => {
  const response = await getApiData(req.body.decode);
  const mapResponse = responseApiGetList(response);
  const order = orderArrayByField(mapResponse, req.query.order).slice(0, 3);
  return order;
};
