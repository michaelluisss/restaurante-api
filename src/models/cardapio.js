const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const cardapio = sequelize.define('cardapio', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    detalhes: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    valor: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    categoria:{
     type: DataTypes.STRING,
     allowNull: false
    } ,
    disponivel:{
      type: DataTypes.BOOLEAN,
      allowNull: false
    }, 
  }, {
    sequelize,
    tableName: 'cardapio',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "cardapio_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  cardapio.associate = (models) => {
  cardapio.hasMany(models.pedidos_itens, { foreignKey: 'cardapio_id' });
};
return cardapio;
};
