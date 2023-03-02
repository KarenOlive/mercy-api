const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Item', {
    ItemId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    ItemName: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    Color: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    SupplierId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Supplier',
        key: 'SupplierId'
      }
    },
    Material: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    Size: {
      type: DataTypes.STRING(35),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Item',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Item__727E838BC3351BC8",
        unique: true,
        fields: [
          { name: "ItemId" },
        ]
      },
    ]
  });
};
