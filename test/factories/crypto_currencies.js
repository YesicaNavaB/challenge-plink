const { factory } = require('factory-girl'),
  faker = require('faker'),
  { CryptoCurrency } = require('../../app/models');

factory.define('CryptoCurrency', CryptoCurrency, {
  cryptoId: () => faker.name.firstName(),
  name: () => faker.name.lastName()
});

module.exports = {
  createCrypto: params => factory.create('CryptoCurrency', params),
  createMany: () => factory.createMany('CryptoCurrency', 5)
};
