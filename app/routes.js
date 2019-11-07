const { signUp, signIn } = require('./controllers/users');
const {
  addCryptoCurrency,
  listCryptoCurrency,
  listTopCryptoCurrency
} = require('./controllers/crypto_currencies');
const { signUpMiddleware, signInMiddleware, validatetokenMiddleware } = require('./middlewares/users');
const { cryptoCurrencyMiddleware } = require('./middlewares/crypto_currencies');

exports.init = app => {
  app.post('/users/sign_up', signUpMiddleware, signUp);
  app.post('/users/sign_in', signInMiddleware, signIn);
  app.post('/crypto_currencies', [validatetokenMiddleware, cryptoCurrencyMiddleware], addCryptoCurrency);
  app.get('/crypto_currencies', validatetokenMiddleware, listCryptoCurrency);
  app.get('/crypto_currencies/top', validatetokenMiddleware, listTopCryptoCurrency);
};
