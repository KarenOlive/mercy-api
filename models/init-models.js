var DataTypes = require("sequelize").DataTypes;
var _AccessRights = require("./AccessRights");
var _Branch = require("./Branch");
var _Customer = require("./Customer");
var _Department = require("./Department");
var _Employee = require("./Employee");
var _Item = require("./Item");
var _OrderItem = require("./OrderItem");
var _Orders = require("./Orders");
var _Store = require("./Store");
var _StoreItem = require("./StoreItem");
var _Supplier = require("./Supplier");
var _UserRole = require("./UserRole");
var _Users = require("./Users");

function initModels(sequelize) {
  var AccessRights = _AccessRights(sequelize, DataTypes);
  var Branch = _Branch(sequelize, DataTypes);
  var Customer = _Customer(sequelize, DataTypes);
  var Department = _Department(sequelize, DataTypes);
  var Employee = _Employee(sequelize, DataTypes);
  var Item = _Item(sequelize, DataTypes);
  var OrderItem = _OrderItem(sequelize, DataTypes);
  var Orders = _Orders(sequelize, DataTypes);
  var Store = _Store(sequelize, DataTypes);
  var StoreItem = _StoreItem(sequelize, DataTypes);
  var Supplier = _Supplier(sequelize, DataTypes);
  var UserRole = _UserRole(sequelize, DataTypes);
  var Users = _Users(sequelize, DataTypes);

  UserRole.belongsTo(AccessRights, { as: "Rights_AccessRight", foreignKey: "Rights"});
  AccessRights.hasMany(UserRole, { as: "UserRoles", foreignKey: "Rights"});
  Employee.belongsTo(Branch, { as: "BranchNo_Branch", foreignKey: "BranchNo"});
  Branch.hasMany(Employee, { as: "Employees", foreignKey: "BranchNo"});
  Orders.belongsTo(Branch, { as: "BranchNo_Branch", foreignKey: "BranchNo"});
  Branch.hasMany(Orders, { as: "Orders", foreignKey: "BranchNo"});
  Store.belongsTo(Branch, { as: "BranchNo_Branch", foreignKey: "BranchNo"});
  Branch.hasMany(Store, { as: "Stores", foreignKey: "BranchNo"});
  Orders.belongsTo(Customer, { as: "Customer", foreignKey: "CustomerId"});
  Customer.hasMany(Orders, { as: "Orders", foreignKey: "CustomerId"});
  Employee.belongsTo(Department, { as: "Department", foreignKey: "DepartmentId"});
  Department.hasMany(Employee, { as: "Employees", foreignKey: "DepartmentId"});
  OrderItem.belongsTo(Item, { as: "Item", foreignKey: "ItemId"});
  Item.hasMany(OrderItem, { as: "OrderItems", foreignKey: "ItemId"});
  StoreItem.belongsTo(Item, { as: "Item", foreignKey: "ItemId"});
  Item.hasMany(StoreItem, { as: "StoreItems", foreignKey: "ItemId"});
  OrderItem.belongsTo(Orders, { as: "Order", foreignKey: "OrderId"});
  Orders.hasMany(OrderItem, { as: "OrderItems", foreignKey: "OrderId"});
  StoreItem.belongsTo(Store, { as: "Store", foreignKey: "StoreId"});
  Store.hasMany(StoreItem, { as: "StoreItems", foreignKey: "StoreId"});
  Item.belongsTo(Supplier, { as: "Supplier", foreignKey: "SupplierId"});
  Supplier.hasMany(Item, { as: "Items", foreignKey: "SupplierId"});
  Employee.belongsTo(UserRole, { as: "Role_UserRole", foreignKey: "Role"});
  UserRole.hasMany(Employee, { as: "Employees", foreignKey: "Role"});
  Employee.belongsTo(Users, { as: "User", foreignKey: "UserId"});
  Users.hasMany(Employee, { as: "Employees", foreignKey: "UserId"});
  UserRole.belongsTo(Users, { as: "User", foreignKey: "UserId"});
  Users.hasMany(UserRole, { as: "UserRoles", foreignKey: "UserId"});

  return {
    AccessRights,
    Branch,
    Customer,
    Department,
    Employee,
    Item,
    OrderItem,
    Orders,
    Store,
    StoreItem,
    Supplier,
    UserRole,
    Users,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
