const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const caixa = sequelize.define('caixa', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    funcionario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
       model: 'funcionarios',
       key: 'id'
     }
    },
    saldo_inicial: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    saldo_final: {
      type: DataTypes.DECIMAL,
      allowNull: true
    },
    data_abertura:{
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull:true
    },
    data_fechamento:{
      type: DataTypes.DATE,
      allowNull:true
    },
    status:{
      type: DataTypes.ENUM('aberto','fechado'),
      defaultValue:'aberto',
      allowNull: false
    }
   }, {
    sequelize,
    tableName: 'caixa',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "caixa_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  caixa.associate = (models) => {
  caixa.belongsTo(models.funcionarios, { foreignKey: 'funcionario_id' });
  caixa.hasMany(models.pagamentos, { foreignKey: 'caixa_id' });
  };
  return caixa;
};
