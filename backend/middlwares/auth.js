const {validateToken}=require("../services/authentication");

function userAuthenticated(req,res,next)
{
   
    const auth=req.headers['authorization'];
    if(!auth)
    {
        return res.status(403).json({valid:false});
    }
    try{
        const decoded=validateToken(auth);
        req.user=decoded;
        next();
    }
    catch(err){
        return res.status(403).json({valid:false});
    }
}
module.exports={
    userAuthenticated,
}