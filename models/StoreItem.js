const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('StoreItem', {
    StoreId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Store',
        key: 'StoreId'
      }
    },
    ItemId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Item',
        key: 'ItemId'
      }
    }
  }, {
    sequelize,
    tableName: 'StoreItem',
    schema: 'dbo',
    timestamps: false
  });
};
