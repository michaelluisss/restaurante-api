'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('caixa', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      funcionario_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'funcionarios',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      saldo_inicial: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      saldo_final: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      data_abertura: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        allowNull: true
      },
      data_fechamento: {
        type: Sequelize.DATE,
        allowNull: true
      },
      status: {
        type: Sequelize.ENUM('aberto', 'fechado'),
        defaultValue: 'aberto',
        allowNull: false
      }
    }, {
      schema: 'public'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('caixa');
  }
};
