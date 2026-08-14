'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('funcionarios', {
      id: {
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      cargo: {
        type: Sequelize.ENUM('garcom', 'caixa', 'gerencia'),
        allowNull: false
      },
      salario: {
        type: Sequelize.DECIMAL,
        allowNull: true
      },
      idade: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      senha: {
        type: Sequelize.STRING(100),
        allowNull: false
      }
    }, {
      schema: 'public'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('funcionarios');
  }
};
