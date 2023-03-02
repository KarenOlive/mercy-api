
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

var Department = require('../../models/Department')(sequelize, DataTypes)

exports.getAllDepartments = async (req, res)=>{ 

    await Department.findAll({}).then(departments=>{
     res.status(200).json({
         
         departments,
         message: `There are ${Department.count()} departments`
         
     });
      
    
 }
 )
 .catch((err)=>{
     res.json({
         message : "Can not find the departments requested"
     })
     console.log(err)
 });

}

exports.add_department =  async(req, res)=>{
    const { DepartmentName} = req.body
       //Checking if department is already in the database
       const departmentExists = await Department.findOne({ where: { DepartmentName: DepartmentName} })
       if(departmentExists) return res.status(400).send(`This department: ${req.body.DepartmentName} already exists`);

       try{
        const department = await Department.create({
            DepartmentName: DepartmentName,
            
        });
        res.status(200).json({
            department: department,
            message: "New department added"
        })
        console.log('New department added');
       }
       catch(err){
        res.json({
            message: "Failed to add department"
        })
        console.log(err);
    }
}


exports.delete_department = async(req, res)=>{
    const deparmentId = req.params.departmentid
    

    try{
        const dept = await Department.findOne({
            where: { DepartmentId: deparmentId }
        })
        if (!dept) {
               return res
                 .status(404)
                 .send(`No employee with id: ${deparmentId} 🤗`);
        }
        
        const result =  await Department.destroy({
            where: { DepartmentId: deparmentId},
          })
          res.status(200).json({
            result,
            message: `${deparmentId} - Department has been deleted`
        })
    }
    catch(err){
        res.json({
            message: "Failed to delete department"
        })
        console.log(err);
    }
}


