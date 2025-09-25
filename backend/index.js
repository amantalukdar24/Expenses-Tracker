require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
const userRoute=require('./routes/user');
const expenseRoute=require('./routes/expense')
const mongoose=require('mongoose');
const analyticsRouter=require("./routes/analytics");

const PORT=process.env.PORT || 3000;
app.use(cors({origin:'*'}));
app.use(express.urlencoded({extended:false}));
mongoose.connect(process.env.MONGO_URL)
 .then(()=>console.log("Mongo Connected"))
 .catch((err)=>console.log(`Mongo error:${err}`));
async function serverRefresh(){
    const refresh=await fetch(`https://expenses-tracker-backend-hvnc.onrender.com/`,{
        method:"GET",
        headers:{
            "Content-Type":"application/json"
        }
    });
    const data=await refresh.json();
    if(data.success) console.log("Server Refresh");
}
setInterval(serverRefresh,30000);

app.use('/user',userRoute);
app.use('/expense',expenseRoute);
app.use('/analytics',analyticsRouter);
app.listen(PORT,()=>console.log(`Server running on the http://localhost:${PORT}`));
