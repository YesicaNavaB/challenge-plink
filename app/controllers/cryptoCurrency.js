const servicesUser = require('../services/cryptoCurrency');
const { responseApiGetList } = require('../serializers/cryptoCurrency');

exports.addCryptoCurrency = (req, res, next) =>
  servicesUser
    .addCryptoCurrency(req.body)
    .then(() => {
      res.status(201).send('the crypto currency was correctly added');
    })
    .catch(next);

exports.listCryptoCurrency = (req, res, next) =>
  servicesUser
    .getCryptoCurrency(req.body)
    .then(data => res.status(201).send(responseApiGetList(data)))
    .catch(next);
