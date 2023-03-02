const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Department', {
    DepartmentId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    DepartmentName: {
      type: DataTypes.STRING(35),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Department',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Departme__B2079BEDA8AC6965",
        unique: true,
        fields: [
          { name: "DepartmentId" },
        ]
      },
    ]
  });
};
