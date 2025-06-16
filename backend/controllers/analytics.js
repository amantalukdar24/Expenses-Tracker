const mongoose = require('mongoose');
const Expense=require('../models/expense');


const reportsevenDays=async (req,res)=>{
   
    
    const todaysDate=new Date();
    const diff=Math.abs(todaysDate.getTime()-(7*24*60*60*1000));
    const sevenDaysAgo=new Date(diff);
    let getData;
    try{
    if(sevenDaysAgo.getDate()>todaysDate.getDate())
    {

        getData=await Expense.aggregate([
            {$match:{userid:new mongoose.Types.ObjectId(req.user._id),
            
                $or:[{
                    "date.year":sevenDaysAgo.getFullYear(),
                    "date.month":sevenDaysAgo.getMonth()+1,
                    $and:[{"date.day":{$gte:sevenDaysAgo.getDate()}},{"date.day":{$gte:todaysDate.getDate()}}]
                },
               
                    {
                        "date.year":todaysDate.getFullYear(),
                        "date.month":todaysDate.getMonth()+1,
                        $and:[{"date.day":{$lte:sevenDaysAgo.getDate()}},{"date.day":{$lte:todaysDate.getDate()}}]
                    },
                  
                ]
             
            
            
              
            }},
           {
            $group:{_id:{day:"$date.day",month:"$date.month",year:"$date.year",type:"$type"},total:{$sum:"$amount"}}
           },{
            $sort:{
                "_id.year":1,
                "_id.month":1,
                "_id.day":1
            }
           }
          ]);
    }
    else{
        getData=await Expense.aggregate([
            {$match:{userid:new mongoose.Types.ObjectId(req.user._id),
            
                
                    
                        "date.year":todaysDate.getFullYear(),
                        "date.month":todaysDate.getMonth()+1,
                        $and:[{"date.day":{$gte:sevenDaysAgo.getDate()}},{"date.day":{$lte:todaysDate.getDate()}}]
                  
              
             
            
            
              
            }},
           {
            $group:{_id:{day:"$date.day",month:"$date.month",year:"$date.year",type:"$type"},total:{$sum:"$amount"}}
           },{
            $sort:{
                "_id.year":1,
                "_id.month":1,
                "_id.day":1
            }
           }
          ]);
    }
    
  
  return res.status(200).json({data:getData});
    }
    catch(err){
        return res.status(404).json({data:null});
    }
}


const reportLast30Days=async (req,res)=>{
 
    const todaysDate=new Date();
    const diff=Math.abs(todaysDate.getTime()-(30*24*60*60*1000));
    const monthAgo=new Date(diff);
    
    
  const getData=await Expense.aggregate([
    {$match:{userid:new mongoose.Types.ObjectId(req.user._id),
      $or:[{
        "date.year":monthAgo.getFullYear(),
        "date.month":monthAgo.getMonth()+1,
       "date.day":{$gte:monthAgo.getDate()},
      },{
        "date.year":todaysDate.getFullYear(),
      "date.month":todaysDate.getMonth()+1,
     "date.day":{$lte:todaysDate.getDate()},
      }]
    }},

      

   {
    $group:{_id:{day:"$date.day",month:"$date.month",year:"$date.year",type:"$type"},total:{$sum:"$amount"}}
   },{
    $sort:{
        "_id.year":1,
        "_id.month":1,
        "_id.day":1
    }
   }
  ]);
  return res.status(200).json({data:getData});

}

const reportLast90Days=async (req,res)=>{
    const todaysDate=new Date();
    const diff=Math.abs(todaysDate.getTime()-(90*24*60*60*1000));
    const nintyDaysAgo=new Date(diff);
    const getData=await Expense.aggregate([{
        $match:{
            userid:new mongoose.Types.ObjectId(req.user._id),
            $or:[
                {
                    "date.year":nintyDaysAgo.getFullYear(),
                    "date.month":nintyDaysAgo.getMonth()+1,
                    "date.day":{$gte:nintyDaysAgo.getDate()}
                },
              
                {
                    $and:[{"date.year":{$gte:nintyDaysAgo.getFullYear()}},{"date.year":{$lte:todaysDate.getFullYear()}}],
                    $or:[{"date.month":{$gt:nintyDaysAgo.getMonth()+1}},{"date.month":{$lt:todaysDate.getMonth()+1}}]
                    
                },
                {
                    "date.year":todaysDate.getFullYear(),
                    "date.month":todaysDate.getMonth()+1,
                    "date.day":{$lte:todaysDate.getDate()}
                }
            ]
        }
    },{
        $group:{
            _id:{
                year:"$date.year",
                month:"$date.month",
                type:"$type"
            },
                total:{$sum:"$amount"}
            
        }
    },{
        $sort:{
            "_id.year":1,
            "_id.month":1,
            
        }
    }]);
    return res.status(200).json({data:getData});
}

const reportLast180Days=async (req,res)=>{
    const todaysDate=new Date();
    const diff=Math.abs(todaysDate.getTime()-(180*24*60*60*1000));
    const sixMonAgo=new Date(diff);
    const getData=await Expense.aggregate([{
        $match:{
            userid:new mongoose.Types.ObjectId(req.user._id),
            $or:[
                {
                    "date.year":sixMonAgo.getFullYear(),
                    "date.month":sixMonAgo.getMonth()+1,
                    "date.day":{$gte:sixMonAgo.getDate()}
                },
              
                {
                    $and:[{"date.year":{$gte:sixMonAgo.getFullYear()}},{"date.year":{$lte:todaysDate.getFullYear()}}],
                    $or:[{"date.month":{$gt:sixMonAgo.getMonth()+1}},{"date.month":{$lt:todaysDate.getMonth()+1}}]
                    
                },
                {
                    "date.year":todaysDate.getFullYear(),
                    "date.month":todaysDate.getMonth()+1,
                    "date.day":{$lte:todaysDate.getDate()}
                }
            ]
        }
    },{
        $group:{
            _id:{
                year:"$date.year",
                month:"$date.month",
                type:"$type"
            },
                total:{$sum:"$amount"}
            
        }
    },{
        $sort:{
            "_id.year":1,
            "_id.month":1,

            
        }
    }]);
    return res.status(200).json({data:getData});
}


const reportLast1year=async (req,res)=>{
    const todaysDate=new Date();
    const diff=Math.abs(todaysDate.getTime()-(365*24*60*60*1000));
    const yearAgo=new Date(diff);
    const getData=await Expense.aggregate([{
        $match:{
            userid:new mongoose.Types.ObjectId(req.user._id),
            $or:[
                {
                    "date.year":yearAgo.getFullYear(),
                    "date.month":yearAgo.getMonth()+1,
                    "date.day":{$gte:yearAgo.getDate()}
                },
              
                {
                    $and:[{"date.year":{$gte:yearAgo.getFullYear()}},{"date.year":{$lte:todaysDate.getFullYear()}}],
                    $or:[{"date.month":{$gt:yearAgo.getMonth()+1}},{"date.month":{$lt:todaysDate.getMonth()+1}}]
                    
                },
                {
                    "date.year":todaysDate.getFullYear(),
                    "date.month":todaysDate.getMonth()+1,
                    "date.day":{$lte:todaysDate.getDate()}
                }
            ]
        }
    },{
        $group:{
            _id:{
                year:"$date.year",
                month:"$date.month",
                type:"$type"
            },
                total:{$sum:"$amount"}
            
        }
    },{
        $sort:{
            "_id.year":1,
            "_id.month":1,

            
        }
    }]);
    return res.status(200).json({data:getData});
}
module.exports={
    reportsevenDays,
    reportLast30Days,
    reportLast90Days,
    reportLast180Days,
    reportLast1year
}