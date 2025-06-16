const {Router}=require('express');
const router=Router();
const {registerNewUser,getExistingUser, getUserInfo,deleteUser,generateOtp,verifyUserOtp,generateOtpForForgotPassword,resetPassword,resetPasswordForReset,selectAvatar,verifyUserOtpForReset}=require("../controllers/user");
const { userAuthenticated} = require('../middlwares/auth');
const {userSchema,resetPassSchema,emailSchema} =require('../middlwares/validate')

router.post('/signup',userSchema,registerNewUser);
router.post("/signin",getExistingUser);
router.get('/info',userAuthenticated,getUserInfo);
router.delete('/delete',userAuthenticated,deleteUser);
router.get('/getOtp',userAuthenticated,generateOtp);
router.post('/verifyOtp',userAuthenticated,verifyUserOtp);
router.post('/verifyOtpForReset',verifyUserOtpForReset);
router.post('/getOtpForReset',emailSchema,generateOtpForForgotPassword);
router.post('/resetPassword',resetPassSchema,userAuthenticated,resetPassword);
router.post('/resetPasswordForReset',resetPassSchema,resetPasswordForReset);
router.post('/changeAvatar',userAuthenticated,selectAvatar);
module.exports=router;