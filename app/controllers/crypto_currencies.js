const interactorsCripto = require('../interactors/crypto_currencies');
const servicesCripto = require('../services/crypto_currencies');

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
  interactorsCripto
    .getListCryptoCurrencies(req.body)
    .then(data => res.status(200).send(data))
    .catch(next);

exports.listTopCryptoCurrency = (req, res, next) =>
  interactorsCripto
    .getListTopCryptoCurrencies(req)
    .then(data => res.status(200).send(data))
    .catch(next);
