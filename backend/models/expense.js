const {Schema,model}=require('mongoose');

const expenseSchema=new Schema({
    description:{
        type:String,
       required:true,
    },
    amount:{
        type:Number,
       required:true,
    },
    type:{
        type:String,
       required:true,
    },
    date:{
           day:{
            type:Number,

           },
           month:{
            type:Number,
           },
           year:{
            type:Number,
           }
    },
    userid:{
        type:Schema.ObjectId,
        ref:'User',
    }
},{
    timestamps:true,
});

const Expense=model('expense',expenseSchema);

module.exports=Expense;