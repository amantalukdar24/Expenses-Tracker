import React, { useEffect, useState } from 'react'
import "../styles/Otp.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {faLeftLong} from "@fortawesome/free-solid-svg-icons"
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
function Otp({setOtpValidate,setStep,step,inputsEmail={}}) {
   const [isLoggedIn,setIsLoggedIn]=useState(false)
   const [activateLoader,setActivateLoader]=useState(false)
    const Navigate=useNavigate();
    const [successOtp,setSuccessOtp]=useState(false)
    const [inputs,setInputs]=useState({
        n1:"",n2:"",n3:"",n4:"",email:""
    });
  
  const [secondsLeft,setSecondsLeft]=useState(30);
   useEffect(() => {
      if(secondsLeft<=0) return;
      const timer=setInterval(()=>{
           setSecondsLeft(secondsLeft-1);
      },1000)
      return ()=>clearInterval(timer)
   },[secondsLeft])
    const handleChange=(e)=>{
     setInputs(()=>({...inputs,[e.target.name]:e.target.value}));
     if( e.target.value.length === 1)
        {
           e.target.nextElementSibling.focus();
        }
       
    }
    useEffect(() => {
      if (localStorage.getItem('token')) {
        setIsLoggedIn(true);
      }
    }, []);
   
  useEffect(()=>{
    setInputs(()=>({...inputs,email:inputsEmail.email}))

  },[])

  const handleSubmit=async (e)=>{
    
     e.preventDefault();
     if(isLoggedIn){
     const response=await fetch('https://expenses-tracker-backend-hvnc.onrender.com/user/verifyOtp',{
        method:"POST",
        headers:{
            "Content-Type":"application/x-www-form-urlencoded",
            "authorization":localStorage.getItem('token')
        },
        body:new URLSearchParams(inputs)
     });
     const data=await response.json();
  

 
   if (data.success) {
      toast.success(data.message);
       setOtpValidate(true)
       setSuccessOtp(true)
     }
   else{
    toast.error(data.message)
   }
}
  else{
  
 
  
   const response=await fetch('https://expenses-tracker-backend-hvnc.onrender.com/user/verifyOtpForReset',{
      method:"POST",
      headers:{
          "Content-Type":"application/x-www-form-urlencoded",
       
      },
      body:new URLSearchParams(inputs)
   });
   const data=await response.json();
  
           if(data.success)
           {
             toast.success(data.message);
             setStep(step+1)
           }
           else{
             toast.error(data.message)
            }
      
  }
  }
  useEffect(()=>{
   if(successOtp) Navigate('/resetPassword')
  },[successOtp]);
  const handleGenrateOtp=async ()=>{
   let response;
   if(isLoggedIn){
      
         response=await fetch('https://expenses-tracker-backend-hvnc.onrender.com/user/getOtp',{
             method:"GET",
             headers:{
                 "Content-Type":"application/json",
                 "authorization":localStorage.getItem('token')
             }
         });
      }
      else{
          response=await fetch('https://expenses-tracker-backend-hvnc.onrender.com/user/getOtpForReset',{
            method:"POST",
            headers:{
            "Content-Type":"application/x-www-form-urlencoded"
            },
            body:new URLSearchParams(inputsEmail)
           });
      }
         const data=await response.json();
         
         if(data.success)
         {
             toast.success(data.message,{position:"top-center",autoClose:10000,delay:2000});
             setSecondsLeft(30);
         }
         else{
             toast.error(data.message,{position:"top-center",autoClose:10000});
         }
      
     }
     const handleNavigate=()=>{
     if(isLoggedIn)
     {
      Navigate('/Settings')
     }
   else setStep(step-1)
     }
  return (
    <div className="Otp">
  <div className='iconbar'>
  <FontAwesomeIcon icon={faLeftLong} size={'2x'} onClick={handleNavigate}/>
  <p className='infos'>
  Didn't receive an OTP?
  {secondsLeft > 0 ? (
    ` (${secondsLeft}s)`
  ) : (
    <span onClick={handleGenrateOtp}>Resend?</span>
  )}
</p>

  </div>
    
     <div className='otpHeader'>
        <h1>Verify Your Email</h1>
        
     </div>
     <div className="otpInputs">
    
        <input type="text" inputMode='numeric' pattern='[0-9]*' name="n1" className="n-fields" maxLength="1" required onChange={handleChange}/>
        <input type="text" inputMode='numeric' pattern='[0-9]*' name="n2" className="n-fields" maxLength="1" required onChange={handleChange}/>
        <input type="text" inputMode='numeric' pattern='[0-9]*' name="n3" className="n-fields" maxLength="1" required onChange={handleChange}/>
        <input type="text" inputMode='numeric' pattern='[0-9]*' name="n4" className="n-fields" maxLength="1" required onChange={handleChange}/>
        
     </div>
    <button type="submit" className="submitOtp" onClick={handleSubmit}>Verify</button>
    </div>
  )
}

export default Otp
