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

var Item = require('../../models/Item')(sequelize, DataTypes)
const Supplier = require('../../models/Supplier')(sequelize, DataTypes)


exports.getAllItems = async (req, res)=>{ 

    await Item.findAll({
            include: {model: Supplier, required: true}
    }).then(items=>{
            res.status(200).json({
         
         items,
         message: `There are ${Item.count()} items`
         
     });
      
    
 }).catch((err)=>{
     res.json({
         message : "Can not find the items requested"
     })
     console.log(err)
 });

}

exports.add_item =  async(req, res)=>{
    const { SupplierId, ItemName, Color, Material, Size } = req.body
       //Checking if item is already in the database
       const itemExists = await Store.findOne({ where: { ItemName: ItemName} })
       if(itemExists) return res.status(400).send(`This store: ${ItemName} already exists`);

       try{
        const supplier = await Supplier.findOne({
            where: {SupplierId: SupplierId}
        });

        const item = await Item.create({
            ItemName: ItemName,
            Color: Color,
            Material: Material,
            Size: Size,
            SupplierId: supplier.SupplierId
           
        });
        res.status(200).json({
            item: item,
            message: "New item created"
        })
        console.log('New item created');
       }
       catch(err){
        res.json({
            message: "Failed to add item"
        })
        console.log(err);
    }
}