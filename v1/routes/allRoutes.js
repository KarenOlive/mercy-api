const express = require('express');
const router = express.Router();
const checkAuth = require('../../helpers/auth');
const { add_Branch } = require('../controllers/branchController');
const { getAllCustomers, add_customer } = require('../controllers/customerController');

const { add_department, delete_department, getAllDepartments } = require('../controllers/departmentController');
const { getAllEmployees, add_employee, update_employee, delete_employee } = require('../controllers/employeeController');
const { getAllItems, add_item } = require('../controllers/itemController');
const { add_order, update_order, delete_order, getAllOrders } = require('../controllers/orderController');
const { getAllStores, add_store } = require('../controllers/storeController');
const { getAllSuppliers, add_supplier } = require('../controllers/supplierController');

//Employees
router.get('/employee', checkAuth, getAllEmployees);

//Departments
router.get('/departments', checkAuth, getAllDepartments);
router.post('/departments', checkAuth, add_department);
router.delete('/departments/:departmentid', checkAuth, delete_department);

//Branch
router.post('/branch', checkAuth, add_Branch);

//Employees
router.post('/employee', checkAuth, add_employee);
router.patch('/employee/:employeeid', checkAuth, update_employee);
router.delete('/employee/:employeeid', checkAuth, delete_employee);

//Orders
router.get('/order', checkAuth, getAllOrders);
router.post('/order', checkAuth, add_order);
router.patch('/order/:orderid', checkAuth, update_order);
router.delete('/order/:orderid', checkAuth, delete_order);

//Supplier
router.get('/suppliers', checkAuth, getAllSuppliers);
router.post('/suppliers', checkAuth, add_supplier);

//Store
 router.get('/store', checkAuth, getAllStores);
router.post('/store', checkAuth, add_store);

//Customer
router.get('/customer', checkAuth, getAllCustomers);
router.post('/customer', checkAuth, add_customer);

//Item
router.get('/item', checkAuth,getAllItems);
router.post('/item', checkAuth, add_item);

module.exports = router;
