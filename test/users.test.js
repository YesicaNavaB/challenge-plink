const request = require('supertest');
const dictum = require('dictum.js');
const app = require('../app');
const { create } = require('../test/factories/user');
const { encodeToken } = require('../app/helpers/tokens');

const userName = 'plinkUser',
  password = 'plink345',
  name = 'Plink',
  lastName = 'Banco',
  preferredCurrency = 'USD';

describe('User registration', () => {
  test('should register with all the fields correctly', done => {
    request(app)
      .post('/users/sign_up')
      .send({
        name,
        lastName,
        userName,
        password,
        preferredCurrency
      })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(201);
        expect(response.body.message).toBe('the user was created correctly');
        dictum.chai(response, 'should register with all the fields correctly');
        done();
      });
  });

  test('should not register because the password not is alphanumeric', done => {
    request(app)
      .post('/users/sign_up')
      .send({
        name,
        lastName,
        userName,
        password: 'jsdhsd*((',
        preferredCurrency
      })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body.message[0]).toBe('Must be only alphanumeric chars');
        done();
      });
  });

  test('should not register because the password not 8 chars long', done => {
    request(app)
      .post('/users/sign_up')
      .send({
        name,
        lastName,
        userName,
        password: 'jhdj',
        preferredCurrency
      })
      .set('Accept', 'application/json')
      .then(response => {
        expect(response.statusCode).toBe(400);
        expect(response.body.message[0]).toBe('Must be at least 8 chars long');
        done();
      });
  });
});

describe('User sign in test, with their respective fields', () => {
  test('should sign in with all the fields correctly', done => {
    create({
      name,
      lastName,
      userName,
      password,
      preferredCurrency
    }).then(() => {
      request(app)
        .post('/users/sign_in')
        .send({ userName, password })
        .set('Accept', 'application/json')
        .then(response => {
          const token = encodeToken(userName);
          expect(response.statusCode).toBe(200);
          expect(response.text).toString(token);
          dictum.chai(response, 'should sign in with all the fields correctly');
          done();
        });
    });
  });

  test('should not sign in with all the fields correctly', done => {
    create({
      name,
      lastName,
      userName,
      password,
      preferredCurrency
    }).then(() => {
      request(app)
        .post('/users/sign_in')
        .send({ userName: 'UserPlinkTest', password })
        .set('Accept', 'application/json')
        .then(response => {
          expect(response.statusCode).toBe(401);
          expect(response.text).toString('');
          done();
        });
    });
  });
});
