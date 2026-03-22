const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const pedidos = sequelize.define('pedidos', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    mesa_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
       model: 'mesas',
       key: 'id'
     }
    },
    cliente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
       model: 'clientes',
       key: 'id'
     }
    },
    status:{
      type: DataTypes.ENUM('aberto','fechado', 'cancelado'),
      allowNull: false
    },
    data_abertura:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull:false
    },
    data_fechamento:{
      type: DataTypes.DATE,
      allowNull:true
    },
    
   }, {
    sequelize,
    tableName: 'pedidos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "pedidos_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  pedidos.associate = (models) => {
    pedidos.belongsTo(models.mesas, { foreignKey: 'mesa_id' });
    pedidos.belongsTo(models.clientes, { foreignKey: 'cliente_id' });
    pedidos.hasMany(models.pedidos_itens, { foreignKey: 'pedido_id' });
    pedidos.hasMany(models.pagamentos, { foreignKey: 'pedido_id' });
  };
  return pedidos;
};
