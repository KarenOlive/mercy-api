
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

var Supplier = require('../../models/Supplier')(sequelize, DataTypes)

exports.getAllSuppliers = async (req, res)=>{ 

    await Supplier.findAll({}).then(suppliers=>{
     res.status(200).json({
         
         suppliers,
         message: `There are ${Supplier.count()} suppliers`
         
     });    
 }).catch((err)=>{
     res.json({
         message : "Can not find the suppliers requested"
     })
     console.log(err)
 });

}

exports.add_supplier =  async(req, res)=>{
    const { SupplierName, SupplierContact } = req.body
       

       try{
        const supplier = await Supplier.create({
            SupplierName: SupplierName,
            SupplierContact: SupplierContact,
      
        });
        res.status(200).json({
           supplier:supplier,
            message: "New supplier created"
        })
        console.log('New supplier created');
       }
       catch(err){
        res.json({
            message: "Failed to add supplier"
        })
        console.log(err);
    }
}