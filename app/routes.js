const { signUp, signIn } = require('./controllers/users');
const {
  addCryptoCurrency,
  listCryptoCurrency,
  listTopCryptoCurrency
} = require('./controllers/cryptoCurrency');
const { signUpMiddleware, signInMiddleware, validatetokenMiddleware } = require('./middlewares/users');
const { cryptoCurrencyMiddleware } = require('./middlewares/cryptoCurrency');

exports.init = app => {
  app.post('/user/signup', signUpMiddleware, signUp);
  app.post('/user/signin', signInMiddleware, signIn);
  app.post('/cryptocurrency/add', [validatetokenMiddleware, cryptoCurrencyMiddleware], addCryptoCurrency);
  app.get('/cryptocurrency/list', validatetokenMiddleware, listCryptoCurrency);
  app.get('/cryptocurrency/toplist', validatetokenMiddleware, listTopCryptoCurrency);
};
