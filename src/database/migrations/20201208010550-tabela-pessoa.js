'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('PESSOA', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      nome:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      rg: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
      },
      telefone: {
        type: Sequelize.BIGINT,
        allowNull: true,
      },
      data_nascimento: {
        type: Sequelize.DATEONLY,
        allowNull: true,
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('PESSOA');
  }
};
