const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

module.exports = (req, res, next)=>{
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).json({ //401 means resource can not be accessed
            message : "Access denied no token provided"
        })
        console.log("Access denied no token provided");
    }
    try{ 
         //verified will return a decoded value
           //userdata is a new field created to store the decoded user data
           const verified = jwt.verify(token, process.env.JWT_KEY)
          
           req.userData = verified;
           next();

        }
    catch(err){
        res.status(401).json({
            err,
            message : "Invalid token"
        })
    }
};