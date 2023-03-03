
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const { Sequelize, DataTypes } = require('sequelize');

dotenv.config();
const {PORT, HOST, HOST_URL, SQL_USER, SQL_DATABASE, SQL_SERVER, SQL_PASSWORD, SQL_HOST} = process.env;

const app = express();

const userRoutes = require('./src/v1/routes/UserRoutes');
const allRoutes = require('./src/v1/routes/allRoutes');
// middleware
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());
//app.use(express.urlencoded({extended: true}));


app.use('/v1/users', userRoutes);
app.use('/v1/', allRoutes);
  

 //connecting to db via sequelize
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

try {
   sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

sequelize.sync({force: false}).then(()=>{
  console.log("re-sync done");
}).catch((err)=>{
  console.log(err);
})






  //testing api
  const port = PORT || 8081;

  app.get('/', (req,res)=>{
    res.send("Welcome to express");
  });

  app.listen(port, () => {
    console.log(`Express Server is listening on url http://localhost:${port}`);
  });
  module.exports.sequelize = sequelize;