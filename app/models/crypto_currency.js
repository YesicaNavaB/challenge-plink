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
      tableName: 'cryptoCurrencies'
    }
  );

  CryptoCurrency.associate = models => {
    CryptoCurrency.belongsTo(models.CryptoCurrency, {
      foreignKey: 'userId'
    });
  };

  CryptoCurrency.createModel = cryptoCurrency => CryptoCurrency.create(cryptoCurrency);

  CryptoCurrency.getOneByIdAndUserId = (cryptoId, userId) =>
    CryptoCurrency.findOne({ where: { cryptoId, userId } });

  CryptoCurrency.getAllByUserId = userId => CryptoCurrency.findAndCountAll({ where: { userId } });

  return CryptoCurrency;
};
