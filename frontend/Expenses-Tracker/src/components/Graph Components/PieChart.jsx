import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useState,useEffect,useCallback } from 'react';
const monthName=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
export default function BasicPie({filterDate,type,setFilterDate}) {
    const [finalData,setFinaldata]=useState([])
    const getData=useCallback(async (params)=>{
      const response=await fetch(`http://localhost:3000/analytics/${params}`,{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "authorization":localStorage.getItem('token')
        },
      });
      const Data=await response.json();
     const {data}=Data;
     const group={};
    
  
  data.forEach((ele)=>{
    let dateKey;
    if(filterDate==="Last Week" || filterDate==="Last Month"){
     dateKey=`${ele._id.day} ${monthName[ele._id.month-1]} ${ele._id.year}`;
    }
    else{
       dateKey=` ${monthName[ele._id.month-1]} ${ele._id.year}`;
    }
    if(!group[dateKey])
      {
         group[dateKey]= {income:0,spend:0};
      }
   
    if (ele._id.type === "Income") {
      group[dateKey].income = ele.total;
    } else if (ele._id.type === "Spend") {
      group[dateKey].spend = ele.total;
    }
  }
  
     
  );

  const obj=[];
  let i=0;
  for(let date in group)
  {
    // dates.push(date);
    // income.push(group[date].income);
    // spend.push(group[date].spend);
    if(type==="Income")
    {
        obj.push({id:i++,value:group[date].income,label:date});
    }
    else
      {
          obj.push({id:i++,value:group[date].spend,label:date});
      }
  }
setFinaldata(obj)
  
    },[]);
    if(filterDate==="Last Week")
    {
      useEffect( ()=>{
       getData("sevenDays")
       
        
      
      },[filterDate])
        
    }
    if(filterDate==="Last Month"){
      useEffect( ()=>{
        getData("thirtyDays");
      },[filterDate]);
    }
    if(filterDate==="Last 3 Months")
    {
      useEffect( ()=>{
        getData("nintyDays");
      },[filterDate]);
    }
    if(filterDate==="Last 6 Months")
    {
      useEffect( ()=>{
        getData("sixMonth");
      },[filterDate]);
    }
    if(filterDate==="Last Year")
      {
        useEffect( ()=>{
          getData("oneYear");
        },[filterDate]);
      }
  return (
    <PieChart
    
      series={[
        {
          data: finalData,
        },
      ]}
     
      width={500}
      height={200}
    />
  );
}

