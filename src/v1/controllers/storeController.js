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

var Store = require('../../../models/Store')(sequelize, DataTypes)
const Branch = require('../../../models/Branch')(sequelize, DataTypes)


exports.getAllStores = async (req, res)=>{ 

    await Store.findAll({
            include: {model: Branch, required: true}
    }).then(stores=>{
            res.status(200).json({
         
         stores,
         message: `There are ${Store.count()} stores`
         
     });
      
    
 }).catch((err)=>{
     res.json({
         message : "Can not find the customers requested"
     })
     console.log(err)
 });

}

exports.add_store =  async(req, res)=>{
    const { BranchNo, StoreName, StoreLocation } = req.body
       //Checking if department is already in the database
       const storeExists = await Store.findOne({ where: { StoreName: StoreName} })
       if(storeExists) return res.status(400).send(`This store: ${StoreName} already exists`);

       try{
        const branch = await Branch.findOne({
            where: {BranchNo: BranchNo}
        });

        const store = await Store.create({
            StoreName: StoreName,
            StoreLocation: StoreLocation,
                BranchNo: branch.BranchNo
           
        });
        res.status(200).json({
            store: store,
            message: "New store created"
        })
        console.log('New store created');
       }
       catch(err){
        res.json({
            message: "Failed to add store"
        })
        console.log(err);
    }
}