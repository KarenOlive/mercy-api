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

const Customer = require('../../../models/Customer')(sequelize, DataTypes)
const Branch = require('../../../models/Branch')(sequelize, DataTypes)
const Orders = require('../../../models/Orders')(sequelize, DataTypes)


exports.getAllOrders = async(req, res)=>{
        
    await Customer.findAndCountAll({
        include: [
            {model: Branch, required: true},
            {model: Customer, required: true}
            

         ],
        limit: 10})
        .then(customer=>{
        res.status(200).json({  
         customer,
         message: `There are ${Customer.count()} Customers`              
        });
        console.log(`There are ${Customer.count()} Customers`)
         
    }
    )
    .catch((err)=>{
        res.json({
            message : "Can not find customers requested"
        })
        console.log(err)
    });
}

exports.add_order = async(req, res)=>{
    const  { BranchNo, CustomerId, Date, Type } = req.body;
       

      try{
       const customer = await Customer.findOne({
           where: {CustomerId: CustomerId}
       });
     
       const branch = await Branch.findOne({
           where: {BranchNo: BranchNo}
       });

       const order = await Orders.create({
           
           Date: Date,
           Type:Type,
           BranchNo: branch.BranchNo,
           CustomerId: customer.CustomerId
                    
       })
       res.status(200).json({
           order: order,
           message: "New order added"
       })
       console.log('New order added');
      }
      catch(err){
       res.json({
           message: "Failed to add order"
       })
       console.log(err);
   }
   }

exports.update_order = async(req, res)=>{
    const  { BranchNo, CustomerId, Date, Type } = req.body;
       const orderId = req.params.orderId;
       
            
    try{

       const order = await Orders.findOne({
           where: { OrderId: orderId }
       })
       if (!order) return res.status(404).send(`No order with id: ${orderId} 🤗`);

       const customer = await Customer.findOne({
        where: {CustomerId: CustomerId}
    });
  
    const branch = await Branch.findOne({
        where: {BranchNo: BranchNo}
    });

           const updatedOrder = await Orders.update({ 
                    
                Date: Date,
                Type:Type,
                BranchNo: branch.BranchNo,
                CustomerId: customer.CustomerId
           }, 
           {
               where: {
                OrderId: orderId
               }
           })
           res.status(200).json({
             updatedOrder,
               message: "Order has been updated"
           })
           
       }
       catch(err){
           res.json({
               message: "Failed to update the Order"
           })
           console.log(err);
       }
   }


exports.delete_order = async(req, res)=>{
    const orderId = req.params.orderId
    const emp = await Orders.findOne({
        where: { OrderId: orderId }
    })
    if (!emp) return res.status(404).send(`No order with id: ${orderId} 🤗`);
    

    try{
        const result =  await Orders.destroy({
            where: { OrderId: orderId},
        })
        res.status(200).json({
            result,
            message: `${orderId} - Order has been deleted`
        })
    }
    catch(err){
        res.json({
            message: "Failed to delete order"
        })
        console.log(err);
    }
}