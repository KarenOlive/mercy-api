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

    const Branch = require('../../../models/Branch')(sequelize, DataTypes)

    exports.add_Branch = async(req,res)=>{
        const { BranchName} = req.body
        //Checking if department is already in the database
        const branchExists = await Branch.findOne({ where: { BranchName: BranchName} })
        if(branchExists) return res.status(400).send(`This Branch: ${BranchName} already exists`);
 
        try{
         const branch = await Branch.create({
             BranchName: BranchName,
             
         });
         res.status(200).json({
             branch: branch,
             message: "New branch added"
         })
         console.log('New branch added');
        }
        catch(err){
         res.json({
             message: "Failed to add branch"
         })
         console.log(err);
     }
    }

