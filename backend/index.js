require('dotenv').config();
const express=require('express');
const app=express();
const cors=require('cors');
const userRoute=require('./routes/user');
const expenseRoute=require('./routes/expense')
const mongoose=require('mongoose');
const analyticsRouter=require("./routes/analytics");

const PORT=process.env.PORT || 3000;
app.use(cors());
app.use(express.urlencoded({extended:false}));
mongoose.connect(process.env.MONGO_URL)
 .then(()=>console.log("Mongo Connected"))
 .catch((err)=>console.log(`Mongo error:${err}`));

app.use('/user',userRoute);
app.use('/expense',expenseRoute);
app.use('/analytics',analyticsRouter);
app.listen(PORT,()=>console.log(`Server running on the http://localhost:${PORT}`));