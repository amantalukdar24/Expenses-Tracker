import React, { useState } from 'react'
import "../styles/ForgotPasswordForm.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faLeftLong} from "@fortawesome/free-solid-svg-icons"
import Otp from './Otp'
import { useNavigate } from 'react-router-dom'
import UpdatePassForm from './UpdatePassForm'
import { toast } from 'react-toastify'
import LinearIndeterminate from '../components/Loader'
function ForgotPasswordForm() {
  const Navigate=useNavigate();
  const [step,setStep]=useState(1);
     const [activateLoader,setActivateLoader]=useState(false);
  const [inputs,setInputs]=useState({email:""});
  const handleChange=(e)=>{
     setInputs(()=>({...inputs,[e.target.name]:e.target.value}));
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    setActivateLoader(true)
     const response=await fetch('https://expenses-tracker-backend-hvnc.onrender.com/user/getOtpForReset',{
      method:"POST",
      headers:{
      "Content-Type":"application/x-www-form-urlencoded"
      },
      body:new URLSearchParams(inputs)
     });
     const data=await response.json();
   
     if(data.success)
     {
      setActivateLoader(false);
      toast.success(data.message,{position:"top-center"});
      setStep(step+1);
     }
     else{
      toast.error(data.message,{position:"top-center"})
      setActivateLoader(false)
     }
  }
  return (
 
    <div>
  {activateLoader && <LinearIndeterminate/>}
      { step==1 && (
          <div className="ForgotPasswordForm">
          <div className="reverseIcon">
          <FontAwesomeIcon icon={faLeftLong} size={'2x'} onClick={()=>Navigate('/Signin')}/>
          </div>
         <h1 className="forgotPassformHeader">Enter Your Email</h1>    
       <div>
        
        <input type="email" className="emailforForgotPass" id="email" name="email" placeholder='Enter Your registered Email Address' onChange={handleChange} />
        </div>
        <div className='btn'>
        <button type="submit" className='LoginBtn' onClick={handleSubmit}>Next</button>
        
        </div>
    </div>
    )}
    {
      step===2 && (
      <Otp setStep={setStep} step={step} inputsEmail={inputs}/>
      ) 
    }
    {
      step===3 && (
        <UpdatePassForm  setStep={setStep} step={step} inputsEmail={inputs}/>
      )
    }
</div>
  )
}

export default ForgotPasswordForm
