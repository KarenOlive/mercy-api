
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

var Customer = require('../../models/Customer')(sequelize, DataTypes)

exports.getAllCustomers = async (req, res)=>{ 

    await Customer.findAll({}).then(customers=>{
     res.status(200).json({
         
         customers,
         message: `There are ${Customer.count()} Customers`
         
     });
      
    
 }
 )
 .catch((err)=>{
     res.json({
         message : "Can not find the customers requested"
     })
     console.log(err)
 });

}

exports.add_customer =  async(req, res)=>{
    const { CustomerName, CustomerContact, Address, IdCopy } = req.body
       

       try{
        const customer = await Customer.create({
            CustomerName: CustomerName,
            CustomerContact: CustomerContact,
            Address:Address,
            IdCopy:IdCopy
        });
        res.status(200).json({
            customer: customer,
            message: "New customer created"
        })
        console.log('New customer created');
       }
       catch(err){
        res.json({
            message: "Failed to add customer"
        })
        console.log(err);
    }
}