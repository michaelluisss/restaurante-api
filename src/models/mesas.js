const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const mesas = sequelize.define('mesas', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    numero: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('livre','ocupada','fechando'),
      defaultValue:'livre',
      allowNull: false
    } 
  }, {
    sequelize,
    tableName: 'mesas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "mesas_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  mesas.associate = (models) => {
    mesas.hasMany(models.pedidos, { foreignKey: 'mesa_id' });
  };
  return mesas;
};