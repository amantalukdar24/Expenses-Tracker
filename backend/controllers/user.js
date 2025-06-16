const USER=require('../models/user')
const Expense=require('../models/expense')
const nodemailer=require('nodemailer')
const OTP=require('../models/otp');
const {createHmac,randomBytes}=require('crypto')
const registerNewUser=async (req,res)=>{
    const {fullName,email,password}=req.body;
     const checkEmailIsAlreadyRegister=await USER.findOne({email:email.toLowerCase()})
     if(checkEmailIsAlreadyRegister)
     {
        return res.status(409).json({error: 'Email is already registered.',token:null});
     }
    await USER.create({
        fullName,
        email:email.toLowerCase(),
        password
    });
    const token=await USER.matchPasswordAndGenerateToken(email,password);
    if(token===null) return res.status(400).json({token:null});
    return res.status(201).json({token:token});

}

const getExistingUser=async (req,res)=>{
    const {email,password}=req.body;
   const token=await USER.matchPasswordAndGenerateToken(email,password);
   if(token===null) return res.status(400).json({token:null});
   return res.status(200).json({token:token});
}

const getUserInfo=async (req,res)=>{
    const {email}=req.user;
    const user=await USER.findOne({email});
    if(!user) return res.status(403).json(null)
    return res.status(200).json(user);

}
const deleteUser=async (req,res)=>{
    
    
    const allDeleted=await Expense.deleteMany({userid:req.user._id});
    

    const response=await USER.findByIdAndDelete(req.user._id);
    try{
        return res.status(200).json({success:true});
    }
    catch(err){
        return res.status(500).json({succees:false});
    }
}

  
 const generateOtp=async (req,res)=>{
  
 let otp="";
    for(let i=0;i<4;i++)
        {
            otp+=Math.floor(Math.random()*10).toString();
        }
    await OTP.create({
        email:req.user.email,
        
    });
    await OTP.findOneAndUpdate({email:req.user.email},{$set:{otp:otp}})
    const transporter=nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"amantalukdar23@gmail.com",
            pass:"kchtfvvduiyleznw"
        }
    });
    const mailOptions={
        from:"amantalukdar23@gmail.com",
        to:req.user.email,
        subject: "Email Verification",
        text:`Your OTP is ${otp}.It is valid for 10 minutes`
    };
  await  transporter.sendMail(mailOptions,function(error,response){
        if(error)
        {
            return res.status(500).json({success: false, message: "Failed to send OTP"});
        }
        else{
            return res.status(200).json({success:true,message:"We have sent an OTP to your registered email."})
        }
    })
 }
 const generateOtpForForgotPassword=async (req,res)=>{
    const {email}=req.body;
    const user=await USER.find({email:email.toLowerCase()});
   
    if(!user.length) return res.status(400).json({succees:false,message:"User didn't exist"})
    let otp="";
       for(let i=0;i<4;i++)
           {
               otp+=Math.floor(Math.random()*10).toString();
           }
     const findEmailForOtp=await OTP.find({email});
     if (!findEmailForOtp ||findEmailForOtp.length !== 0)
     {
        await OTP.findOneAndUpdate({email:email},{$set:{
            otp:otp,
        }})
     }
     else{
       await OTP.create({
           email:email,
           
       });
     }
     await OTP.findOneAndUpdate({email:email},{$set:{
        otp:otp,
    }})
       const transporter=nodemailer.createTransport({
           service:"gmail",
           auth:{
               user:"amantalukdar23@gmail.com",
               pass:"kchtfvvduiyleznw"
           }
       });
       const mailOptions={
           from:"amantalukdar23@gmail.com",
           to:email,
           subject: "Email Verification",
           text:`Your OTP is ${otp}.It is valid for 10 minutes`
       };
     await  transporter.sendMail(mailOptions,function(error,response){
           if(error)
           {
               return res.status(500).json({success: false, message: "Failed to send OTP"});
           }
           else{
               return res.status(200).json({success:true,message:"We have sent an OTP to your registered email."})
           }
       })
    }
   

 const verifyUserOtp=async (req,res)=>{
    const user=await OTP.find({email:req.user.email})
 
    
    const {n1,n2,n3,n4}=req.body;
    const userProvideOtp=n1+n2+n3+n4;
 
    try{
        if(user ){
            const otp=user[0].otp
            if(otp===userProvideOtp){
  
           await OTP.deleteOne({email:req.user.email});
           return res.status(200).json({success: true, message: "OTP verified successfully."});
   
                 }     
                 return res.status(400).json({success: false, message: "Invalid OTP."});
        
    }
}

catch(err){

    return res.status(500).json({success: false, message: "An error occurred during OTP verification."});
}
 }
 const verifyUserOtpForReset=async (req,res)=>{
    const {email}=req.body;
    
    const user=await OTP.find({email:email.toLowerCase()})
 
    console.log(email)
    const {n1,n2,n3,n4}=req.body;
    const userProvideOtp=n1+n2+n3+n4;
   
    try{
        
    if (!user || user.length === 0) {
        return res.status(400).json({ success: false, message: "OTP not found or expired." });
      }
        if(user ){
            const otp=user[0].otp
            if(otp===userProvideOtp){
  
           await OTP.deleteOne({email:email});
           return res.status(200).json({success: true, message: "OTP verified successfully."});
   
                 }     
                 return res.status(400).json({success: false, message: "Invalid OTP."});
        
    }
}

catch(err){

    return res.status(500).json({success: false, message: "An error occurred during OTP verification."});
}
 }
const resetPassword=async (req,res)=>{
    const {password}=req.body;
    const salt=randomBytes(16).toString();
    const hashedPassword=createHmac('sha256',salt)
                         .update(password)
                         .digest('hex');
                        
    const result=await USER.findByIdAndUpdate(req.user._id,{$set:{
        password:hashedPassword,
        salt:salt,
    }});
    try{
        return res.status(200).json({success:true,message:"Password Updated"})
    }
    catch(err)
    {
        return res.status(400).json({success:false,message:"Internal Server Error"})
    }

}
const resetPasswordForReset=async (req,res)=>{
    const {password,email}=req.body;
    const salt=randomBytes(16).toString();
    const hashedPassword=createHmac('sha256',salt)
                         .update(password)
                         .digest('hex');
                        
    const result=await USER.findOneAndUpdate({email:email.toLowerCase()},{$set:{
        password:hashedPassword,
        salt:salt,
    }});
    try{
        return res.status(200).json({success:true,message:"Password Updated"})
    }
    catch(err)
    {
        return res.status(400).json({success:false,message:"Internal Server Error"})
    }

}
const selectAvatar=async (req,res)=>{
   try{
    const {avatar}=req.body;
   
    const result=await USER.findByIdAndUpdate(req.user._id,{$set:{
        avatarName:avatar,
    }});
    if(!result)
    {
        return res.status(400).json({success:false,message:"User Not Found"})
    }
    return res.status(400).json({success:true,message:"Avatar Changed"})
   }
   catch(err){
    return res.status(500).json({success:false,message:"Something Went Wrong"})
   }

}
module.exports={
    registerNewUser,
    getExistingUser,
    getUserInfo,
    deleteUser,
    generateOtp,
    generateOtpForForgotPassword,
    verifyUserOtp,
    verifyUserOtpForReset,
    resetPassword,
    resetPasswordForReset,
    selectAvatar
   
}