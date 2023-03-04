const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Branch', {
    BranchNo: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    BranchName: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    BranchLocation: {
      type: DataTypes.STRING(35),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Branch',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Branch__A16B446A787E6DEC",
        unique: true,
        fields: [
          { name: "BranchNo" },
        ]
      },
    ]
  });
};
