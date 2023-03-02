const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Customer', {
    CustomerId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    CustomerName: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    CustomerContact: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    Address: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    IdCopy: {
      type: DataTypes.BLOB,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Customer',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Customer__A4AE64D8D9FBCE8F",
        unique: true,
        fields: [
          { name: "CustomerId" },
        ]
      },
    ]
  });
};
