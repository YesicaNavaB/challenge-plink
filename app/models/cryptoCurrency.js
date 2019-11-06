'use strict';
module.exports = (sequelize, DataTypes) => {
  const CryptoCurrency = sequelize.define(
    'CryptoCurrency',
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      cryptoId: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'crypto_id'
      },
      userId: {
        type: DataTypes.INTEGER,
        field: 'user_id'
      }
    },
    {
      paranoid: true,
      underscored: true,
      freezeTableName: true,
      tableName: 'cryptoCurrencys'
    }
  );

  CryptoCurrency.associate = models => {
    CryptoCurrency.hasMany(models.CryptoCurrency, {
      foreignKey: 'userId'
    });
  };

  return CryptoCurrency;
};
