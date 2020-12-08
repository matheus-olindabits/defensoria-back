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
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
      },
      rg: {
        type: Sequelize.INTEGER,
        allowNull: true,
        unique: true,
      },
      telefone: {
        type: Sequelize.INTEGER,
        allowNull: true,
      },
      data_nascimento: {
        type: Sequelize.DATE,
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
