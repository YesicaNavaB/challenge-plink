const request = require('supertest'),
  app = require('../app'),
  dictum = require('dictum.js');
const { create } = require('./factories/user');
const { createCrypto } = require('../test/factories/crypto_currencies');
const { serializerCrypto } = require('./fixture/list_currencies');

const { encodeToken } = require('../app/helpers/tokens');

const userName = 'plinkUser',
  password = 'plink345',
  name = 'Plink',
  lastName = 'Banco',
  preferredCurrency = 'USD';

const nameCrypto = 'Bitcoin',
  cryptoId = 'BTC',
  userId = 1;

describe('add crypto currency', () => {
  test('should allow to add a crypto currency to a user', done => {
    create({
      name,
      lastName,
      userName,
      password,
      preferredCurrency
    }).then(() => {
      const token = encodeToken(userName);
      request(app)
        .post('/crypto_currencies')
        .send({
          name: nameCrypto,
          cryptoId
        })
        .set({ Accept: 'application/json', Authorization: token })
        .then(result => {
          expect(result.statusCode).toBe(201);
          expect(result.body.message).toBe('the crypto currency was correctly added');
          dictum.chai(result, 'should allow to add a crypto currency to a user');
          done();
        });
    });
  });

  test('should not allow to add a crypto currency to a user', done => {
    create({
      name,
      lastName,
      userName,
      password,
      preferredCurrency
    }).then(() => {
      const token = encodeToken(userName);
      request(app)
        .post('/crypto_currencies')
        .send({
          name: 'YHT',
          cryptoId: 'YHT'
        })
        .set({ Accept: 'application/json', Authorization: token })
        .then(result => {
          expect(result.statusCode).toBe(400);
          expect(result.body.message).toBe('the crypto currency is not correct');
          done();
        });
    });
  });
});

describe('crypto currencys List', () => {
  test('should list the user crypto currency', done => {
    create({
      name,
      lastName,
      userName,
      password,
      preferredCurrency
    })
      .then(() => {
        createCrypto({ cryptoId, name: nameCrypto, userId });
      })
      .then(() => {
        const token = encodeToken(userName);
        request(app)
          .get('/crypto_currencies')
          .send({ userName, password })
          .set({ Accept: 'application/json', Authorization: token })
          .then(response => {
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual(serializerCrypto);
            dictum.chai(response, 'should list the user crypto currency');
            done();
          });
      });
  });
});
