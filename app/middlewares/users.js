const error = require('../errors');
const logger = require('../logger');
const { schemaSignUpYup, schemaSignInYup, validateTokenMiddleware } = require('../helpers/schemas_yup');
const { findOneUser } = require('../services/users');
const bcrypt = require('bcryptjs');
const { decodedToken } = require('../helpers/tokens');
const config = require('../../config');
const { expiration } = config.common.tokens;

exports.signUpMiddleware = async (req, res, next) => {
  try {
    await schemaSignUpYup.validate(req.body, { abortEarly: false });
  } catch (err) {
    logger.error(err.errors);
    return next(error.signUpError(err.errors));
  }
  const userExists = await findOneUser(req.body.userName);
  if (userExists !== null) {
    return next(error.databaseError('User name already exists'));
  }
  return next();
};

exports.signInMiddleware = async (req, res, next) => {
  try {
    await schemaSignInYup.validate(req.body, { abortEarly: false });
  } catch (err) {
    logger.error(err.errors);
    return next(error.signUpError(err.errors));
  }
  const result = await findOneUser(req.body.userName);
  if (!result) {
    return next(error.signInError('user does not exist'));
  }
  const compare = await bcrypt.compare(req.body.password, result.password);
  if (!compare) {
    return next(error.signInError('user name or password incorrect'));
  }
  return next();
};

exports.validatetokenMiddleware = async (req, res, next) => {
  try {
    await validateTokenMiddleware.validate(
      { Authorization: req.header('Authorization') },
      { abortEarly: false }
    );
  } catch (err) {
    logger.error(err.errors);
    return next(error.validateTokenError(err.errors));
  }
  req.body.decode = decodedToken(req.header('Authorization'));
  const result = await findOneUser(req.body.decode.userName);
  if (result === null) {
    return next(error.validateTokenError('user does not exist'));
  }
  const { expiresAt } = req.body.decode;
  const calculateSeconds = Math.floor(Date.now() / 1000) - expiresAt;
  if (expiration < calculateSeconds) {
    return next(error.validateTokenError('the token has expired'));
  }
  return next();
};
