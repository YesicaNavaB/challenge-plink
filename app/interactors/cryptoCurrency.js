const servicesUser = require('../services/users');
const servicesCripto = require('../services/cryptoCurrency');
const { responseApiGetList } = require('../serializers/cryptoCurrency');
const { orderArrayByField } = require('../helpers/arrayField');

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
