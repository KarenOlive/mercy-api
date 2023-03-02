const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('UserRole', {
    Role: {
      type: DataTypes.STRING(30),
      allowNull: false,
      primaryKey: true
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'UserId'
      }
    },
    Rights: {
      type: DataTypes.STRING(30),
      allowNull: true,
      references: {
        model: 'AccessRights',
        key: 'Rights'
      }
    }
  }, {
    sequelize,
    tableName: 'UserRole',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__UserRole__DA15413F23A52BA5",
        unique: true,
        fields: [
          { name: "Role" },
        ]
      },
    ]
  });
};
