const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('OrderItem', {
    OrderId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Orders',
        key: 'OrderId'
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
    tableName: 'OrderItem',
    schema: 'dbo',
    timestamps: false
  });
};
