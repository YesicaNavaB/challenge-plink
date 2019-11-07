const { factory } = require('factory-girl'),
  faker = require('faker'),
  { User } = require('../../app/models'),
  config = require('../../config/index'),
  bcrypt = require('bcryptjs'),
  { saltNumber } = config.common.bcrypt,
  salt = bcrypt.genSaltSync(Number(saltNumber));

factory.define(
  'User',
  User,
  {
    firstName: () => faker.name.firstName(),
    lastName: () => faker.name.lastName(),
    userName: () => faker.name.firstName() + faker.name.lastName(),
    password: () => faker.internet.password()
  },
  {
    afterCreate: model => {
      model.password = bcrypt.hashSync(model.password, salt);
      return model.save();
    }
  }
);

module.exports = {
  create: params => factory.create('User', params),
  createMany: () => factory.createMany('User', 5)
};
