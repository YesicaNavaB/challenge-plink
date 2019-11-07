const servicesUser = require('../services/users');
const servicesCripto = require('../services/crypto_currencies');
const { responseApiGetList } = require('../serializers/crypto_currencies');
const { orderArrayByField } = require('../helpers/array_fields');

const getApiData = async ({ userName }) => {
  const user = await servicesUser.findOneUser(userName);
  const cryptoCurrencys = await servicesCripto.getListCryptoCurrency(user.id);
  if (cryptoCurrencys.count > 0) {
    return servicesCripto.getListcryptoCurrencys(cryptoCurrencys, user.preferredCurrency);
  }
  return [];
};

exports.getListCryptoCurrencys = async req => {
  const response = await getApiData(req.decode);
  return responseApiGetList(response);
};

exports.getListTopCryptoCurrencys = async req => {
  const response = await getApiData(req.body.decode);
  const mapResponse = responseApiGetList(response);
  const order = orderArrayByField(mapResponse, req.query.order).slice(0, 3);
  return order;
};
