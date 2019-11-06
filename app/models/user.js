'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'last_name'
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: 'user_name'
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      preferredCurrency: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'preferred_currency'
      }
    },
    {
      paranoid: true,
      underscored: true,
      freezeTableName: true,
      tableName: 'users'
    }
  );
  return User;
};
