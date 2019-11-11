const internalError = (message, internalCode) => ({
  message,
  internalCode
});

exports.DATABASE_ERROR = 'database_error';
exports.databaseError = message => internalError(message, exports.DATABASE_ERROR);

exports.SIGN_UP_ERROR = 'sign_up_error';
exports.signUpError = message => internalError(message, exports.SIGN_UP_ERROR);

exports.SIGN_IN_ERROR = 'sign_in_error';
exports.signInError = message => internalError(message, exports.SIGN_IN_ERROR);

exports.CRYPTO_CURRENCY_ERROR = 'add_crypto_currency_error';
exports.cryptoCurrencyError = message => internalError(message, exports.CRYPTO_CURRENCY_ERROR);

exports.VALIDATE_TOKEN_ERROR = 'validate_token_error';
exports.validateTokenError = message => internalError(message, exports.VALIDATE_TOKEN_ERROR);

exports.BRAVE_NEW_COIN_API_ERROR = 'brave_new_coin_error';
exports.braveNewCoinApiError = message => internalError(message, exports.BRAVE_NEW_COIN_API_ERROR);

exports.DEFAULT_ERROR = 'default_error';
exports.defaultError = message => internalError(message, exports.DEFAULT_ERROR);
