const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Store', {
    StoreId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    StoreName: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    StoreLocation: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    BranchNo: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Branch',
        key: 'BranchNo'
      }
    }
  }, {
    sequelize,
    tableName: 'Store',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Store__3B82F10145C10140",
        unique: true,
        fields: [
          { name: "StoreId" },
        ]
      },
    ]
  });
};
