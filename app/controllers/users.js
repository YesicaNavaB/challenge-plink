const bcrypt = require('bcryptjs');
const config = require('../../config');
const { encodeToken } = require('../helpers/tokens');
const { saltNumber } = config.common.bcrypt;
const { expiration } = config.common.tokens;

const salt = bcrypt.genSaltSync(Number(saltNumber));
const servicesUser = require('../services/users');

exports.signUp = (req, res, next) => {
  req.body.password = bcrypt.hashSync(req.body.password, salt);
  return servicesUser
    .createUser(req.body)
    .then(user => {
      res.status(201).send({ message: 'the user was created correctly', user: { userName: user.userName } });
    })
    .catch(next);
};

exports.signIn = (req, res) =>
  res.status(200).send({
    accessToken: encodeToken(req.body.userName),
    expiresIn: `${expiration} segundos`
  });
