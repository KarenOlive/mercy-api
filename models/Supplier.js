const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Supplier', {
    SupplierId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    SupplierName: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    SupplierContact: {
      type: DataTypes.STRING(35),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Supplier',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Supplier__4BE666B4692CE24D",
        unique: true,
        fields: [
          { name: "SupplierId" },
        ]
      },
    ]
  });
};
