import React,{useState,useEffect} from 'react'
import "../styles/Home.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {faXmark,faPenToSquare,faTrash} from "@fortawesome/free-solid-svg-icons"
import  {toast} from "react-toastify"
function EditForm({setEditFormActivated,itemId,editFormActivated}) {

     const [inputs,setInputs]=useState({
        description:'',
        amount:'',
        type:'Income',
        date:'',
     });
     const handleChange=(e)=>{
        setInputs(()=>({...inputs,[e.target.name]:e.target.value}));
       }
    const existingData=async ()=>{
        const response=await fetch(`http://localhost:3000/expense/${itemId}`,{
            method:'GET',
            headers:{
                "Content-Type":"application/json",
                "authorization":localStorage.getItem('token')
            }
        });
        const Data=await response.json();

       const {data}=Data;
      
       const getDate = new Date(data.date.year, data.date.month - 1, data.date.day);
       const yyyy = getDate.getFullYear();
const mm = String(getDate.getMonth() + 1).padStart(2, '0');
const dd = String(getDate.getDate()).padStart(2, '0');

const formatted = `${yyyy}-${mm}-${dd}`;

setInputs({description:data.description,amount:data.amount,type:data.type,date:formatted});
    }

    useEffect(()=>{
        existingData();
    },[editFormActivated,setEditFormActivated])

const handleSubmit=async (e)=>{
    e.preventDefault();
    const response=await fetch(`http://localhost:3000/expense/${itemId}`,{
        method:"PATCH",
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded',
      'authorization':localStorage.getItem('token'),
      
        },
        body:new URLSearchParams(inputs)
    });
    const data=await response.json();
    
    if(!data.success){
        toast.error("Something Went Wrong")
    }
    toast.success("Expense Altered Successfully")
      setEditFormActivated(false);

}
  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setMaxDate(today);
  }, []);
  return (
   <div className="addExpenseForm">
       <div className='exitBar'>
         <button className="exitBtn" onClick={()=>{setEditFormActivated(false)}}>
         <FontAwesomeIcon icon={faXmark} size="3x"/>
         </button>
        
       </div>
       <div >
         <form className='expenseItems' onSubmit={handleSubmit} >
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
             <select className="type"  name="type" value={inputs.type}  onChange={handleChange}>
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
             Update
               </button>
             </div>
         </form>
       </div>
     </div>
  )
}

export default EditForm