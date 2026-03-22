const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const pedidos_itens = sequelize.define('pedidos_itens', {
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
    cardapio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
       model: 'cardapio',
       key: 'id'
     }
    },
    quantidade: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    preco_unit: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },

    
   }, {
    sequelize,
    tableName: 'pedidos_itens',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pedidos_itens_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
   pedidos_itens.associate = (models) => {
    pedidos_itens.belongsTo(models.pedidos, { foreignKey: 'pedido_id' });
    pedidos_itens.belongsTo(models.cardapio, { foreignKey: 'cardapio_id' });
  };
  return pedidos_itens;
};