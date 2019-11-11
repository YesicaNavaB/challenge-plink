const servicesCripto = require('../services/crypto_currencies');
const { User } = require('../models');

exports.addCryptoCurrency = (req, res, next) =>
  servicesCripto
    .addCryptoCurrency(req.body)
    .then(result => {
      res.status(201).send({
        message: 'the crypto currency was correctly added',
        cryptoCurrency: { cryptoId: result.cryptoId, name: result.name }
      });
    })
    .catch(next);

exports.listCryptoCurrency = (req, res, next) =>
  User.getOneByUserName(req.body.decode.userName)
    .then(user => {
      req.body.userId = user.id;
      req.body.preferredCurrency = user.preferredCurrency;
      return servicesCripto.getListCryptoCurrencies(req.body);
    })
    .then(data => res.status(200).send(data))
    .catch(next);

exports.listTopCryptoCurrency = (req, res, next) =>
  User.getOneByUserName(req.body.decode.userName)
    .then(user => {
      req.body.userId = user.id;
      req.body.preferredCurrency = user.preferredCurrency;
      return servicesCripto.getListCryptoCurrencies(req.body);
    })
    .then(data => res.status(200).send(data))
    .catch(next);
