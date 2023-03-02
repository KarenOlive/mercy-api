const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('AccessRights', {
    Rights: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    }
  }, {
    sequelize,
    tableName: 'AccessRights',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__AccessRi__F4DB3CC2DD1B7E80",
        unique: true,
        fields: [
          { name: "Rights" },
        ]
      },
    ]
  });
};
