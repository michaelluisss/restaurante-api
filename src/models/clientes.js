const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const clientes =  sequelize.define('clientes', {
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
    idade: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    uf: {
      type: DataTypes.STRING(2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'clientes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "clientes_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  
  clientes.associate = (models) => {
    clientes.hasMany(models.pedidos,{ foreignKey : 'cliente_id'})
  };
  return clientes;
};
