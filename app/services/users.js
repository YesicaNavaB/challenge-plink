const { User } = require('../models');
const error = require('../errors');
const logger = require('../logger');

exports.findOneUser = userName =>
  User.findOne({
    where: { userName },
    attributes: ['id', 'password', 'preferredCurrency']
  }).catch(err => {
    throw error.databaseError(err.message);
  });

exports.createUser = userData =>
  User.create(userData)
    .then(result => {
      logger.info(`the user was created correctly: ${userData.name}`);
      return result;
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        logger.error('User already exists');
        throw error.signUpError('User already exists');
      }
      logger.error(`Could not create user: ${userData.name}`);
      throw error.databaseError(err.message);
    });
