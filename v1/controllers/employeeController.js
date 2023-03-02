const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const {PORT, HOST, HOST_URL, SQL_USER, SQL_DATABASE, SQL_SERVER, SQL_PASSWORD, SQL_HOST, JWT_KEY} = process.env;

const sequelize = new Sequelize(SQL_DATABASE, SQL_USER, SQL_PASSWORD, {
    host: SQL_HOST,
    dialect: 'mssql',
    pool:{
        max : 5,
        min: 0,
        acquire: 30000,
        idle: 100000
    }
    });

const Employee = require('../../models/Employee')(sequelize, DataTypes)
const Department = require('../../models/Employee')(sequelize, DataTypes)
const UserRole = require('../../models/UserRole')(sequelize, DataTypes)
const Branch = require('../../models/Branch')(sequelize, DataTypes)

// const {Department, Users, Branch } = require('../../models/init-models')

    exports.getAllEmployees = async(req, res)=>{
        
        await Employee.findAndCountAll({
            include: [
                {model: Branch, required: true},
                {model: Department, required: true},
                {model: UserRole, as: 'Roles', required: true},

             ],
            limit: 10})
            .then(employee=>{
            res.status(200).json({  
             employee ,
             message: `${Employee.count()}`              
            });
            console.log(`There are ${Employee.count()} projects`)
             
        }
        )
        .catch((err)=>{
            res.json({
                message : "Can not find users requested"
            })
            console.log(err)
        });
    }


    exports.add_employee = async(req, res)=>{
     const  {EmployeeName, EmployeeContact, DateOfBirth, NextOfKin, MaritalStatus, Nationality, NIN, BranchNo, DepartmentId, Role  } = req.body;
        const {userId} = req.userData;

       try{
        const role = await UserRole.findOne({
            where: {Role: Role}
        });
        const department = await Department.findOne({
            where: {DepartmentId: DepartmentId}
        });
        const branch = await Branch.findOne({
            where: {BranchNo: BranchNo}
        });

        const employee = await Employee.create({
            EmployeeName: EmployeeName,
            EmployeeContact: EmployeeContact,
            DateOfBirth: DateOfBirth,
            NextOfKin: NextOfKin,
            MaritalStatus: MaritalStatus,
            Nationality: Nationality,
            NIN: NIN,
            BranchNo: branch.BranchNo,
            DepartmentId: department.DepartmentId,
            Role: role.Role,
            UserId: userId
            
            
        });
        res.status(200).json({
            employee: employee,
            message: "New employee added"
        })
        console.log('New employee added');
       }
       catch(err){
        res.json({
            message: "Failed to add employee"
        })
        console.log(err);
    }
    }


    exports.update_employee = async(req, res)=>{
     const  {EmployeeName, EmployeeContact, DateOfBirth, NextOfKin, MaritalStatus, Nationality, NIN, BranchNo, DepartmentId, Role } = req.body;
        const employeeId = req.params.employeeid;
        const {userId} = req.userData;
       
       
     try{

        const emp = await Employee.findOne({
            where: { EmployeeId: employeeId }
        })
        if (!emp) return res.status(404).send(`No employee with id: ${employeeId} 🤗`);

        const role = await UserRole.findOne({
            where: {Role: Role}
        });
        const department = await Department.findOne({
            where: {DepartmentId: DepartmentId}
        });
        const branch = await Branch.findOne({
            where: {BranchNo: BranchNo}
        });

            const updatedEmployee = await Employee.update({ 
                EmployeeName: EmployeeName,
                EmployeeContact: EmployeeContact,
                DateOfBirth: DateOfBirth,
                NextOfKin: NextOfKin,
                MaritalStatus: MaritalStatus,
                Nationality: Nationality,
                NIN: NIN,
                BranchNo: branch.BranchNo,
                DepartmentId: department.DepartmentId,
                Role: role.Role,
                UserId: userId
            }, 
            {
                where: {
                  EmployeeId: employeeId
                }
            })
            res.status(200).json({
                updatedEmployee,
                message: "Employee has been updated"
            })
            
        }
        catch(err){
            res.json({
                message: "Failed to update the employee"
            })
            console.log(err);
        }
    }


    exports.delete_employee = async(req, res)=>{
        const employeeId = req.params.employeeid
        const emp = await Employee.findOne({
            where: { EmployeeId: employeeId }
        })
        if (!emp) return res.status(404).send(`No employee with id: ${employeeId} 🤗`);
        

    try{
        const result =  await Employee.destroy({
            where: { EmployeeId: employeeId},
          })
          res.status(200).json({
            result,
            message: `${employeeId} - Employee has been deleted`
        })
    }
    catch(err){
        res.json({
            message: "Failed to delete department"
        })
        console.log(err);
    }
    }