'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('ATENDIMENTO', { 
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      titulo:{
        type: Sequelize.STRING,
        allowNull: false,
      },
      observacao:{
        type: Sequelize.TEXT,
        allowNull: false,
      },
      status: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      data_conclusao: {
        type: Sequelize.DATEONLY,
        allowNull: false,
      },
      arquivo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      id_usuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'USUARIO', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_pessoa:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'PESSOA', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      id_assunto:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'ASSUNTO', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
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
    return queryInterface.dropTable('ATENDIMENTO');
  }
};
