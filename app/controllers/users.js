const bcrypt = require('bcryptjs');
const config = require('../../config');
const { encodeToken } = require('../helpers/token');
const { saltNumber } = config.common.bcrypt;
const salt = bcrypt.genSaltSync(Number(saltNumber));
const servicesUser = require('../services/users');

exports.signUp = (req, res, next) => {
  req.body.password = bcrypt.hashSync(req.body.password, salt);
  return servicesUser
    .createUser(req.body)
    .then(() => {
      res.status(201).send('the user was created correctly');
    })
    .catch(next);
};

exports.signIn = (req, res) =>
  res.status(200).send({
    accessToken: encodeToken(req.body.userName),
    expiresIn: Math.floor(Date.now() / 1000)
  });
