'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pedidos_itens', {
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
      cardapio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'cardapio',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      quantidade: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      preco_unit: {
        type: Sequelize.DECIMAL,
        allowNull: false
      }
    }, {
      schema: 'public'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('pedidos_itens');
  }
};
