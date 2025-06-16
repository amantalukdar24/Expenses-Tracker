const Joi=require('joi');
const { schema } = require('../models/otp');

function userSchema(req,res,next){
const {fullName,email,password}=req.body;

const schema=Joi.object({

    fullName:Joi.string()
            .min(3)
            .max(30)
            .required()
            .messages({
                'string.min': 'Name must be at least 3 characters long',
      'string.max': 'Name must not exceed 30 characters',
                'string.empty': 'Name is required',
              }),
           
    email:Joi.string()
         .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
         .required()
       .messages({'string.email': 'Please enter a valid email address',
      'string.empty': 'Email is required',
      'any.required': 'Email is required',}),
        
    password:Joi.string()
    .min(6)
    .max(12)
    .required()
    .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{6,12}$'))
    .messages({
      'string.min': 'Password must be at least 8 characters long',
      'string.max': 'Password must not exceed 12 characters long',
        'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character',
        'string.empty': 'Password is required',
      }),
          

});
 const {error} =  schema.validate({fullName,email,password}); 

 if(error)
 {
    return res.status(400).json({error:error.details[0].message,token:null})
 };
 next();
}

function resetPassSchema(req,res,next)
{
  try{
  const {password,confirmPassword}=req.body;
    const schema=Joi.object({
      password:Joi.string()
      .min(6)
      .max(12)
      .required()
      .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{6,12}$'))
      .messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password must not exceed 12 characters long',
          'string.pattern.base': 'Password must include uppercase, lowercase, number, and special character',
          'string.empty': 'Password is required',
        }),
        confirmPassword:Joi.string().valid(Joi.ref('password')).required()
        .messages({
          'any.only': "Password didn't match",
          'string.empty': 'Confirm Password is required',
          })
    });

    const {error}=schema.validate({password,confirmPassword});
    if(error)
    {
      return res.status(400).json({success:false,message:error.details[0].message})
    }
   
    next();
  }
  catch(err){
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error in validation',
    });
  }
}
function emailSchema(req,res,next)
{
  const {email}=req.body;
  try{
  const schema=Joi.object({
    email:Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
  .messages({'string.email': 'Please enter a valid email address',
 'string.empty': 'Email is required',
 'any.required': 'Email is required',}),
  });
  const {error}=schema.validate({email});
  if(error)
  {
    return res.status(400).json({success:false,message:error.details[0].message})
  }
  next();
}
catch(err)
{
  return res.status(500).json({
    success: false,
    message: 'Internal Server Error in validation',
  });
}
}
module.exports={
    userSchema,
    resetPassSchema,
    emailSchema
}