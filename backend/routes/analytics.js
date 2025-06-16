
const {Router}=require('express')
const {userAuthenticated}=require("../middlwares/auth")
const router=Router();
const {reportsevenDays,reportLast30Days,reportLast90Days,reportLast180Days,reportLast1year}=require("../controllers/analytics");


router.get("/sevenDays",userAuthenticated,reportsevenDays);

router.get("/thirtyDays",userAuthenticated,reportLast30Days);
router.get("/nintyDays",userAuthenticated,reportLast90Days);
router.get("/sixMonth",userAuthenticated,reportLast180Days);
router.get("/oneYear",userAuthenticated,reportLast1year);
module.exports=router;