const { Sequelize, DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken'); 

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



var User = require('../../../models/Users')(sequelize, DataTypes)
const {userSignUp, userLogIn} = require('../../../helpers/validation');
   
   
exports.userSignup = async(req, res)=>{

   
    //Let's validate the data before we add a new user
    const { error } =  userSignUp(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message);
      }

   //Checking if user is already in the database
    const userExists = await User.findOne({ where: { UserName: req.body.UserName} })
    if(userExists) return res.status(400).send(`User with this username: ${req.body.UserName} already exists`);

    try{
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.Password, salt)
 
        const user = await User.create({
            UserName: req.body.UserName,
            Password: hashedPassword
        });
        
        res.status(200).json({
            user: user,
            message: "You have successfully signed up"
        })
        console.log('A new user has signed up');
 
    }
    catch(err){
        res.json({
            message: "Failed to sign up"
        })
        console.log(err);
    }

}
 

exports.show_decoded_token_data = async (req, res)=>{
    res.send(req.userData)
}

exports.userLogin = async (req, res)=>{
  
    const { UserName, Password } = req.body;
    //Let's validate the data before we log in the  user
    const { error } =  userLogIn(req.body)
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    try{
        const user = await User.findOne({where: { UserName: UserName}})
        if(!user){
             return res.status(400).json({message: `${UserName} doesn't exist`});
            }
        

        const validPassword = await bcrypt.compare(Password, user.Password);
        if(!validPassword) {
            return res.status(400).json({message: "Wrong Password"})
        }
        
        else{
           const token = jwt.sign(
                {
                    userId: user.UserId,
                   
                    UserName: user.UserName
                },
                 JWT_KEY,
                {
                    expiresIn: "1h"
                }
            );
            
            res.header('auth-token',token);   
            res.status(200).json({
                message: "Log In successful, Welcome back!",
                token: token,
       
            })
            console.log(`User: ${UserName} has logged in`);
        }
    }
    catch(err){
        res.status(500).json({
            message: "Failed to log in"
        })
        console.log(err)
    }



} 
  

    exports.getAllUsers = async (req, res)=>{ 

       await User.findAll().then(users=>{
        res.status(200).json({
            count: users.length,
            users
            
        });
         
        //res.sendStatus(200);
       // console.log(users);
    }
    )
    .catch((err)=>{
        res.json({
            message : "Can not find users requested"
        })
        console.log(err)
    });
}

