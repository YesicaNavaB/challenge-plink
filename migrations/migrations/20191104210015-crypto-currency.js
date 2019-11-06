'use strict';
module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('cryptoCurrencys', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      crypto_id: {
        type: Sequelize.STRING,
        allowNull: false
      },
      user_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      deleted_at: Sequelize.DATE
    }),
  down: queryInterface => queryInterface.dropTable('cryptoCurrencys')
};
