require('dotenv').config();
const jwt=require('jsonwebtoken');
const secret=process.env.JWT_SECRET_KEY;
function createTokenForUser(user){
    const payload={
        _id:user._id,
        fullName:user.fullName,
        email:user.email,
    };
    const token=jwt.sign(payload,secret);
  
    return token;
}

function validateToken(token){
    const payload=jwt.verify(token,secret);
    return payload;
}

module.exports={
    createTokenForUser,
    validateToken
}
