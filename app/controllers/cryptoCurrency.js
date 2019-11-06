const interactorsCripto = require('../interactors/cryptoCurrency');
const servicesCripto = require('../services/cryptoCurrency');

exports.addCryptoCurrency = (req, res, next) =>
  servicesCripto
    .addCryptoCurrency(req.body)
    .then(() => {
      res.status(201).send('the crypto currency was correctly added');
    })
    .catch(next);

exports.listCryptoCurrency = (req, res, next) =>
  interactorsCripto
    .getListCryptoCurrencys(req.body)
    .then(data => res.status(201).send(data))
    .catch(next);

exports.listTopCryptoCurrency = (req, res, next) =>
  interactorsCripto
    .getListTopCryptoCurrencys(req)
    .then(data => res.status(201).send(data))
    .catch(next);
