const Expense =require('../models/expense');
const mongoose=require('mongoose')

const saveExpense=async (req,res)=>{
    const {description,amount,type,date}=req.body;
    const thisDate=new Date(date);
    Expense.create({
        description,
       amount: Number(amount),
        type,
        date:{
            day:thisDate.getDate(),
            month:thisDate.getMonth()+1,
            year:thisDate.getFullYear(),
        },
        userid:req.user._id,
    });
  return  res.status(201).json(true);
};

const totalOfTypes=async (req,res)=>{
    
    const totalValues=await Expense.aggregate([
        {
            $match:{userid:new mongoose.Types.ObjectId(req.user._id)}
        },
        {
            $group:{_id:"$type",total:{$sum:"$amount"}}
        }
    ]);
    try{
        return res.status(200).json({total:totalValues,success:true});
    }
    catch(err){
        return res.status(404).json({total:null,success:false});
    }
   
}
const allExpenses=async (req,res)=>{
    const allExpenses=await Expense.find({userid:req.user._id}).sort({"date.year":1,"date.month":1,"date.day":1});
    if(!allExpenses) return status(200).json({data:null});

    try{
        return res.status(200).json({data:allExpenses});
    }
    catch(err)
    {
        return res.status(500).json({data:null});
    }
}
const deleteExpense=async (req,res)=>{
    
    const result=await Expense.findByIdAndDelete(req.params.id);
    try{
        return res.status(200).json({result:true});
    }
    catch(err){
        return res.status(404).json({result:false});
    }
}
const getItem=async (req,res)=>{
    const item=await Expense.findById(req.params.id);
    try{
        return res.status(200).json({data:item});
    }
    catch(err){
        return res.status(404).json({data:null});
    }
}
const editItem=async (req,res)=>{
    const {description,amount,type,date}=req.body;
    const thisDate=new Date(date)
    const result=await Expense.findByIdAndUpdate(req.params.id,{
        $set:{
            description,
            amount: Number(amount),
            type,
            date:{
                day:thisDate.getDate(),
                month:thisDate.getMonth()+1,
                year:thisDate.getFullYear(),
            },
        }
    });

    try{
        
        return res.status(200).json({success:true});
    }
    catch{
        return res.status(404).json({success:false})
    }
}
module.exports={
    saveExpense,
    totalOfTypes,
    allExpenses,
    deleteExpense,
    getItem,
    editItem
}