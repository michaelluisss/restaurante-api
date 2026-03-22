const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const funcionarios = sequelize.define('funcionarios', {
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
    cargo: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    salario: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    idade: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'funcionarios',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "funcionarios_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  funcionarios.associate = (models) => {
    funcionarios.hasMany(models.caixa,{ foreignKey : 'funcionario_id'})
  };
  return funcionarios;
};
