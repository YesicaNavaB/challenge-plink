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

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
describe('User registration', () => {
  test('should create a user with the fields of (userName, passsword, name, lastname, preferredCurrency)', done => {
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

  test('you should not create a username when the password is not alphanumeric', done => {
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

  test('you should not create a username when the password is not 8 characters long', done => {
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

describe('should allow the user to log in', () => {
  test('you should be logged in when you enter the correct username and password', done => {
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

  test('you should not log in when you enter the wrong username and password', done => {
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
          expect(response.body.message).toBe('user does not exist');
          done();
        });
    });
  });
});

describe('the expiration of the token will be validated ', () => {
  test('you should not allow a service to be consumed when the token is expired', done => {
    create({
      name,
      lastName,
      userName,
      password,
      preferredCurrency
    }).then(() =>
      request(app)
        .post('/users/sign_in')
        .send({ userName, password })
        .set('Accept', 'application/json')
        .then(() => {
          const token = encodeToken(userName);
          delay(2000).then(() => {
            request(app)
              .get('/crypto_currencies')
              .set({ Accept: 'application/json', Authorization: token })
              .then(result => {
                expect(result.statusCode).toBe(401);
                expect(result.body.message).toBe('the token has expired');
                done();
              });
          });
        })
    );
  });
});
