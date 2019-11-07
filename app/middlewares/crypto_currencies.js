const { schemaAddCryptoCurrencyYup } = require('../schemas/schemas_validates');
const error = require('../errors');
const { CryptoCurrency, User } = require('../models');
const logger = require('../logger');
const servicesCrypto = require('../services/crypto_currencies');

exports.cryptoCurrencyMiddleware = async (req, res, next) => {
  try {
    await schemaAddCryptoCurrencyYup.validate(req.body, { abortEarly: false });
  } catch (err) {
    logger.error(err.errors);
    return next(error.cryptoCurrencyError(err.errors));
  }
  const user = await User.getOneByUserName(req.body.decode.userName);
  req.body.userId = user.id;
  const crypto = await CryptoCurrency.getOneByIdAndUserId(req.body.cryptoId, user.id);
  if (crypto !== null) {
    return next(error.cryptoCurrencyError('this crypto currency has already been added for this user'));
  }
  const validateCrypto = await servicesCrypto.validateCryptoCurrency(req.body.cryptoId, req.body.name);
  if (validateCrypto.success === false) {
    return next(error.cryptoCurrencyError('the crypto currency is not correct'));
  }
  return next();
};
