const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const pagamentos = sequelize.define('pagamentos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    pedido_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
       model: 'pedidos',
       key: 'id'
     }
    },
    caixa_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
       model: 'caixa',
       key: 'id'
     }
    },
    forma_pagamento: {
      type: DataTypes.ENUM('dinheiro','pix','credito','debito'),
      allowNull: false,
    },
    valor_total: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    valor_pago: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    troco: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },

    
   }, {
    sequelize,
    tableName: 'pagamentos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pagamentos_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
   pagamentos.associate = (models) => {
    pagamentos.belongsTo(models.mesas, { foreignKey: 'mesa_id' });
    pagamentos.belongsTo(models.clientes, { foreignKey: 'cliente_id' });
  };
  return pagamentos;
};