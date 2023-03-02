const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  const User = sequelize.define('Users', {
    UserId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    UserName: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Users',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Users__1788CC4C04BF491A",
        unique: true,
        fields: [
          { name: "UserId" },
        ]
      },
    ]
  })
  return User;
};

