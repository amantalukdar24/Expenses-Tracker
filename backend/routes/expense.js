const {Router}=require('express');
const {saveExpense,totalOfTypes,allExpenses,deleteExpense,getItem,editItem}=require("../controllers/expense");
const {userAuthenticated}=require("../middlwares/auth")
const router=Router();

router.post('/addExpense',userAuthenticated,saveExpense);
router.get('/totalOfTypes',userAuthenticated,totalOfTypes);
router.get('/allExpenses',userAuthenticated,allExpenses);
router.delete("/:id",userAuthenticated,deleteExpense);
router.get('/:id',userAuthenticated,getItem);
router.patch('/:id',userAuthenticated,editItem)

module.exports=router