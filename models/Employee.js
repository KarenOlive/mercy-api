const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Employee', {
    EmployeeId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    EmployeeName: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    EmployeeContact: {
      type: DataTypes.STRING(35),
      allowNull: false
    },
    DateOfBirth: {
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
    },
    DepartmentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Department',
        key: 'DepartmentId'
      }
    },
    Role: {
      type: DataTypes.STRING(30),
      allowNull: true,
      references: {
        model: 'UserRole',
        key: 'Role'
      }
    },
    UserId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'Users',
        key: 'UserId'
      }
    },
    NextOfKin: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    MaritalStatus:{
      type: DataTypes.STRING(50),
      allowNull: true
    },
    Nationality: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    NIN: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'Employee',
    schema: 'dbo',
    timestamps: false,
    indexes: [
      {
        name: "PK__Employee__7AD04F1107A5CB61",
        unique: true,
        fields: [
          { name: "EmployeeId" },
        ]
      },
    ]
  });
};
