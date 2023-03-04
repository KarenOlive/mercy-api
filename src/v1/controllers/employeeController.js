const { Sequelize, DataTypes } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();
const {PORT, HOST, HOST_URL, SQL_USER, SQL_DATABASE, SQL_SERVER, SQL_PASSWORD, SQL_HOST, JWT_KEY} = process.env;
const initModels = require("../../../models/init-models");
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
    const models = initModels(sequelize);





    exports.getAllEmployees = async(req, res)=>{
        
        await models.Employee.findAll({
            include: [
                {model: models.Branch, as: 'Branch', required: true},
                {model: models.Department, as: 'Department', required: true},
                {model: models.UserRole, as: 'Roles', required: true},

             ],
             limit: 2
            })
            .then(employee=>{
            res.status(200).json({  
                count: employee.length,
             employee,
                        
            });
            console.log(`There are ${employee.length} employees`)
             
        }
        )
        .catch((err)=>{
            res.json({
                err,
                message : "Can not find the employees requested"
            })
            console.log(err)
        });
    }


    exports.add_employee = async(req, res)=>{
     const  {EmployeeName, EmployeeContact, DateOfBirth, NextOfKin, MaritalStatus, Nationality, NIN, BranchNo, DepartmentId, Role  } = req.body;
        const {userId} = req.userData;

       try{
        const role = await models.UserRole.findOne({
            where: {Role: Role}
        });
        const department = await models.Department.findOne({
            where: {DepartmentId: DepartmentId}
        });
        const branch = await models.Branch.findOne({
            where: {BranchNo: BranchNo}
        });

        const employee = await models.Employee.create({
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

        const emp = await models.Employee.findOne({
            where: { EmployeeId: employeeId }
        })
        if (!emp) return res.status(404).send(`No employee with id: ${employeeId} 🤗`);

        const role = await models.UserRole.findOne({
            where: {Role: Role}
        });
        const department = await models.Department.findOne({
            where: {DepartmentId: DepartmentId}
        });
        const branch = await models.Branch.findOne({
            where: {BranchNo: BranchNo}
        });

            const updatedEmployee = await models.Employee.update({ 
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
        const emp = await models.Employee.findOne({
            where: { EmployeeId: employeeId }
        })
        if (!emp) return res.status(404).send(`No employee with id: ${employeeId} 🤗`);
        

    try{
        const result =  await models.Employee.destroy({
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