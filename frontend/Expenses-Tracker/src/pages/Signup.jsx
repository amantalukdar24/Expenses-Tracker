import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom';
import {toast} from "react-toastify"
import "../styles/Signup.css"
function Signup() {
  const Navigate=useNavigate();
  const [inputs,setInputs]=useState({
    fullName:'',
    email:'',
    password:'',

  });
  const handleChange=(e)=>{
    setInputs(()=>({...inputs,[e.target.name]:e.target.value}))
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
    const response=await fetch("http://localhost:3000/user/signup",{
      method:"POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
      body:new URLSearchParams(inputs),
     });
     const data=await response.json();
     if(data.error){
      toast.warning(data.error,{position:"top-center"});
      Navigate('/Signup')
     }
     if(data.token!==null){
    localStorage.setItem("token",data.token);
    Navigate('/Home')
     }
    
  }
  return (
    <div className='signup'>
      <h1 className="Signup-header">Signup</h1>
      <form className="Signup-form" onSubmit={handleSubmit}>
      <div>
        <div className="label"><label for="fullName" >Full Name</label></div> 
        <input type="text" className="fullName" id="fullName" name="fullName" value={inputs.fullName} onChange={handleChange} placeholder=''/>
        </div>
        <div>
        <div className="label"><label for="email" >Email</label></div> 
        <input type="email" className="email" id="email" name="email" value={inputs.email} onChange={handleChange} />
        </div>
        <div>
        <div className="label">  <label for="password">Password</label></div>
        <input type="password" className='password' id="password" name="password" value={inputs.password} onChange={handleChange}  />
        </div>
        <div className='btn'>
        <button type="submit" className='RegisterBtn' onClick={()=>{Navigate('/Home')}}>Register</button>

        </div>
        
      </form>

    </div>
  )
}

export default Signup