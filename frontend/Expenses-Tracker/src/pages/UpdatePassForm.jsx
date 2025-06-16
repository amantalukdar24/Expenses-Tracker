import React,{useEffect, useState} from 'react'
import "../styles/UpdatePassForm.css"
import { toast } from 'react-toastify'
import { useNavigate,useLocation } from 'react-router-dom';
function UpdatePassForm({setStep,inputsEmail}) {
  
    const Navigate=useNavigate();
  
  const [isLoggedIn,setIsLoggedIn]=useState(false);
useEffect(()=>{
    if(localStorage.getItem('token')) setIsLoggedIn(true);
},[]);
  

    const [inputs,setInputs]=useState({password:'',confirmPassword:'',email:''});
    const handleChange=(e)=>{
        setInputs(()=>({...inputs,[e.target.name]:e.target.value}));
    }
    const handleSubmit=async (e)=>{
        e.preventDefault();
        let response;
        if(isLoggedIn){
         response=await fetch('http://localhost:3000/user/resetPassword',{
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
                "authorization":localStorage.getItem('token')
            },
            body:new URLSearchParams(inputs)
        });
    }
    else{
        setInputs(()=>({...inputs,email:inputsEmail.email}))
        response=await fetch('http://localhost:3000/user/resetPasswordForReset',{
            method:"POST",
            headers:{
                "Content-Type":"application/x-www-form-urlencoded",
                "authorization":localStorage.getItem('token')
            },
            body:new URLSearchParams(inputs)
        });
    }
        const data=await response.json();
        if(isLoggedIn){
        if(data.success)
        {
            toast.success(data.message,{position:"top-center"});
          
            Navigate('/Home')
        }
        else{
            toast.error(data.message,{position:"top-center"})
        }
    }
    else{
        if(data.success)
            {
                toast.success(data.message,{position:"top-center"});
              
                Navigate('/Signin')
            }
            else{
                toast.error(data.message,{position:"top-center"})
            }
    }
    }
  return (
    <div className='passForm'>
        <h1 className='passHeader'>Reset Password</h1>
        <form onSubmit={handleSubmit}>
            <div className="PasswordSection">
            <label for="Password">Enter Your New Password</label>
            <input type="password" required className='resetPassword' name="password" onChange={handleChange}/>
            </div>
            <div className="PasswordSection">
            <label for="Password">Confirm New Password</label>
            <input type="password" required className='resetPassword' name="confirmPassword" onChange={handleChange}/>
            </div>
            <button type="submit" className='submitPass'>Reset</button>
        </form>
        
    </div>
  )
}

export default UpdatePassForm