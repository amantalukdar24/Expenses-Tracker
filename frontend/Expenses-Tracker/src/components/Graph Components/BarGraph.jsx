import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import {useEffect,useState,useCallback} from "react"
const monthName=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
export default function SimpleBarChart({filterDate,setFilterDate}){
  const [spendData,setSpendData]=useState([]);
  const [incomeData,setIncomeData]=useState([]);
  const [xLabels,setXlabels]=useState([]);
  const getData=useCallback(async (params)=>{
    const response=await fetch(`https://expenses-tracker-backend-hvnc.onrender.com/analytics/${params}`,{
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
const income=[];
const spend=[];
const dates=[];

for(let date in group)
{
  dates.push(date);
  income.push(group[date].income);
  spend.push(group[date].spend);
}
setXlabels(dates);
setIncomeData(income);
setSpendData(spend);

  },[filterDate]);
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
    <BarChart
      width={800}
      height={300}
      series={[
        { data: incomeData, label: 'Income', id: 'pvId' },
        { data: spendData, label: 'Spend', id: 'uvId' },
      ]}
      xAxis={[{ data: xLabels, scaleType: 'band' }]}
    />
  );
}
