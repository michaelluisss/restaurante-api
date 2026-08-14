'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pagamentos', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      pedido_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'pedidos',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      caixa_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'caixa',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      forma_pagamento: {
        type: Sequelize.ENUM('dinheiro', 'pix', 'credito', 'debito'),
        allowNull: false
      },
      valor_total: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      valor_pago: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      troco: {
        type: Sequelize.DECIMAL,
        allowNull: true
      }
    }, {
      schema: 'public'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pagamentos');
  }
};
