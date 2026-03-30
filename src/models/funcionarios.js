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
      type: DataTypes.ENUM('garcom','caixa','gerencia'),
      allowNull: false
    },
    salario: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    idade: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    senha: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [6,100]
      }
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
