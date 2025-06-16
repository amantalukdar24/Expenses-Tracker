const {Schema,model}=require('mongoose');
const {randomBytes,createHmac}=require('crypto');
const {createTokenForUser}=require("../services/authentication")
const userSchema=new Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
        
    },
    password:{
        type:String,
        required:true,
        
    },
    avatarName:{
        type:String,
        default:"man.png"
    }

},{timestamps:true});

userSchema.pre('save',function (next){
     const user=this;
     if(!user.isModified('password')) return;
     const salt=randomBytes(16).toString();
     const hashedPassword=createHmac('sha256',salt)
                          .update(user.password)
                          .digest('hex');
    this.salt=salt;
    this.password=hashedPassword;
     next();
});

userSchema.static('matchPasswordAndGenerateToken',async function(email,password){
    const user=await this.findOne({email:email.toLowerCase()});
    if(!user) return null;
    const salt=user.salt;
    const hashedPassword=user.password;
    const userProvidedHash=createHmac("sha256",salt)
                           .update(password)
                           .digest('hex');
    if(hashedPassword!==userProvidedHash) return null;
    const token=createTokenForUser(user);
    
    return token;
});

const USER=model('user',userSchema);

module.exports=USER;