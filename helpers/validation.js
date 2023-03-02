const Joi = require('joi');

const userSignUp = (data) =>{
    const schema = Joi.object({

    UserName : Joi.string().min(7).required(),
    
    Password : Joi.string().min(8).required()
 });

 return schema.validate(data);

}

const userLogIn = (data) =>{
    const schema = Joi.object({

    UserName : Joi.string().min(7).required(),
    
    Password : Joi.string().min(8).required()
 });

 return schema.validate(data);

}
module.exports.userSignUp = userSignUp;
module.exports.userLogIn = userLogIn;

