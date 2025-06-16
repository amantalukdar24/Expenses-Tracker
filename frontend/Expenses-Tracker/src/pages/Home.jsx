import React, {  useCallback, useEffect, useState } from 'react'
import "../styles/Home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {faXmark,faPenToSquare,faTrash} from "@fortawesome/free-solid-svg-icons"
import EditForm from './EditForm'
import { toast } from 'react-toastify'

function Home() {
 const [inputs,setInputs]=useState({
    description:'',
    amount:'',
    type:'Income',
    date:'',
 });
 
 const [totalValues,setTotalValues]=useState({
  totalIncome:0,
  totalSpend:0,
  totalSavings:0,
 });
 const [expenseData,setExpenseData]=useState({});

 const handleChange=(e)=>{
  setInputs(()=>({...inputs,[e.target.name]:e.target.value}));
 }
 const handleSubmit=async (e)=>{
  e.preventDefault();
  const response=await fetch("http://localhost:3000/expense/addExpense",{
    method:"POST",
    headers:{
      'Content-Type': 'application/x-www-form-urlencoded',
      'authorization':localStorage.getItem('token'),
    },
    body:new URLSearchParams(inputs)
  });
  const data=await response.json();
  if(!data){
     toast.error("Something Went Wrong")
  }
  setInputs({
    description:'',
    amount:'',
    type:'Income',
    date:'',
  })
  setIsActivate(false);
  toast.success("Expense Added")
 }
  const [isActivate,setIsActivate]=useState(false);
  const handleClick=()=>{
    setIsActivate(true);
  }
  const getTotalvalues=useCallback(async ()=>{
    const response=await fetch("http://localhost:3000/expense/totalOfTypes",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "authorization":localStorage.getItem('token'),
      },
    });
  const data=await response.json();
  const {total,success}=data;
  if(success)
  {
    let income=0,spend=0,savings=0;
    total.forEach((ele)=>{
      
      if(ele._id==='Income'){
         income=ele.total;
      }
      if(ele._id==="Spend") spend=ele.total;
      savings=income-spend;
     if(savings<0) savings=0;
    });
   setTotalValues({
    totalIncome:income,
    totalSpend:spend,
    totalSavings:savings,
   }) 
    
  }
  
  },[]);

  const getAllExpenses=useCallback(async ()=>{
    const response=await fetch("http://localhost:3000/expense/allExpenses",{
      method:"GET",
      headers:{
        "Content-Type":"application/json",
        "authorization":localStorage.getItem('token'),
      }
    });
   const Data=await response.json();
   const {data}=Data; 
    
    setExpenseData(data);
 
  },[]);

  const deleteItem=async (e)=>{
    const itemId=e.target.closest('li').id;

    const result=await fetch(`http://localhost:3000/expense/${itemId}`,{
      method:"DELETE",
      headers:{
        "authorization":localStorage.getItem('token'),
      }
    });
    const data=await result.json();
    if(!data.result)
    {
      toast.error("Try Again Later")
    }
    toast.success("Expense Deleted")
  }

useEffect(() => {
getTotalvalues();
getAllExpenses();

},[isActivate,deleteItem]);

const [itemId,setItemId]=useState("");
const [editFormActivated,setEditFormActivated]=useState(false);
const handleEdit=(e)=>{
  setEditFormActivated(true);
  setItemId(e.target.closest('li').id);

}

const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMaxDate(today);
  }, []);

  return (
    <div className="Home">
      <div className="totalExpensesDisplay">
        <div className="totalIncome">
          <h1>Income</h1>
          <p>₹{totalValues.totalIncome}</p>
        </div>
        <div className="totalSpend">
          <h1>Spend</h1>
          <p>₹{totalValues.totalSpend}</p>
        </div>
        <div className="totalSavings">
          <h1>Savings</h1>
          <p>₹{totalValues.totalSavings}</p>
        </div>

      </div>

      <div className="expensesHeader">
        <h1>Expenses</h1>
        <button className="addExpense" onClick={handleClick}>Add Expense</button>
      </div>
 {
  isActivate &&
  <>
  <div className="addExpenseForm">
    <div className='exitBar'>
      <button className="exitBtn" onClick={()=>{setIsActivate(false)}}>
      <FontAwesomeIcon icon={faXmark} size="3x"/>
      </button>
    </div>
    <div >
      <form className='expenseItems' onSubmit={handleSubmit}>
        <div className='inputDivs'>
           <label for="description">
            Description
           </label>
           <input type="text" required maxLength="30" className="description" name="description" value={inputs.description} onChange={handleChange}/>
        </div>
        <div className='inputDivs'>
           <label for="Amount">
            Amount
           </label>
           <input type="number" required className="amount" name="amount" value={inputs.amount} onChange={handleChange}/>
        </div>
        <div className='inputDivs'>
          <label for="type">Type</label>
          <select className="type"  name="type" value={inputs.type} onChange={handleChange}>
            <option value="Income" >Income</option>
            <option value="Spend">Spend</option>
          </select>
         

        </div>
        <div className='inputDivs'>
            <label for="date">
             Date
            </label>
            <input type="date" required name="date" className="date" value={inputs.date} max={maxDate} onChange={handleChange}/>
          </div>
          <div className='inputDivs'>
            <button  type="submit" className='addBtn' >
              Add
            </button>
          </div>
      </form>
    </div>
  </div>
  </>
 }

<div className="allExpenses">

   <div className="expensesListHeader">
    <h3 className="headings">Description</h3>
    <h3 className="headings">Amount</h3>
    <h3 className="headings">Type</h3>
    <h3 className="headings">Date</h3>
    <h3 className="headings">Tools</h3>
   </div>
   <div className="expensesList">
   <ul>
    
   
    {Object.entries(expenseData).map(([key,ele])=>(
      <li key={key} id={ele._id} className='listDetails'>
        <div className='liDes'>{ele.description}</div>
        <div className='liAmount'>₹ {ele.amount}</div>
        <div className='liType' id={ele.type}>{ele.type}</div>
        <div className='liDate'>{ele.date.day}/{ele.date.month}/{ele.date.year}</div>
        <div className="tools">
          <button className='editBtn' onClick={handleEdit}>  <FontAwesomeIcon icon={faPenToSquare} size="2x" /></button>
      
        <button className="deleteBtn" onClick={deleteItem}><FontAwesomeIcon icon={faTrash} size="2x"  /></button>
     
        </div>
      </li>
    ))
}
   </ul>
   </div>
</div>
{editFormActivated && <EditForm editFormActivated={editFormActivated} setEditFormActivated={setEditFormActivated} itemId={itemId}/>}
    </div>
  )
}

export default Home

