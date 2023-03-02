const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Orders', {
    OrderId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    BranchNo: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Branch',
        key: 'BranchNo'
      }
    },
    CustomerId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Customer',
        key: 'CustomerId'
      }
    },
    Date: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    Type: {
      type: DataTypes.STRING(35),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Orders',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Orders__C3905BCFDEED107B",
        unique: true,
        fields: [
          { name: "OrderId" },
        ]
      },
    ]
  });
};
