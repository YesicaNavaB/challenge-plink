const { schemaAddCryptoCurrencyYup } = require('../helpers/schemas_yup');
const error = require('../errors');
const logger = require('../logger');
const servicesCrypto = require('../services/crypto_currencies');
const servicesUser = require('../services/users');

exports.cryptoCurrencyMiddleware = async (req, res, next) => {
  try {
    await schemaAddCryptoCurrencyYup.validate(req.body, { abortEarly: false });
  } catch (err) {
    logger.error(err.errors);
    return next(error.cryptoCurrencyError(err.errors));
  }

  const user = await servicesUser.findOneUser(req.body.decode.userName);
  req.body.userId = user.id;
  const crypto = await servicesCrypto.findOneCryptoCurrency(req.body.cryptoId, user.id);
  if (crypto !== null) {
    return next(error.cryptoCurrencyError('this crypto currency has already been added for this user'));
  }
  const validateCrypto = await servicesCrypto.validateCryptoCurrency(req.body.cryptoId, req.body.name);
  if (validateCrypto.success === false) {
    return next(error.cryptoCurrencyError('the crypto currency is not correct'));
  }
  return next();
};
