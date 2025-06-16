import React, { useState } from 'react'
import "../styles/Signin.css"
import {useNavigate,NavLink} from "react-router-dom"
import {toast} from "react-toastify"
function Signin() {
  const Navigate=useNavigate();
  const [isUser,setIsuser]=useState(false);
  const [inputs,setInputs]=useState({
    email:"",
    password:"",
  });
  const handleChange=(e)=>{
    setInputs(()=>({...inputs,[e.target.name]:e.target.value}));
  };
  const handleSubmit=async (e)=>{
    e.preventDefault();
    const response=await fetch("https://expenses-tracker-backend-hvnc.onrender.com/user/signin",{
      method:"POST",
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
        },
        body:new URLSearchParams(inputs),
    });
    const data=await response.json();
    if(data?.token===null) {
      setIsuser(false);
      toast.error("Incorrect email or password",{position:"top-center"});
    }
    else{
      setIsuser(true);
     
    localStorage.setItem("token",data.token);
    window.location.reload();
   
    }
  }
  return (
    
    <div className='signin'>
        
           
       
        <h1 className="login-header">Login</h1>
       
 
      <form className="Signin-form" onSubmit={handleSubmit}>
        <div>
        <div className="label"><label for="email" >Email</label></div> 
        <input type="email" className="email" id="email" name="email" value={inputs.email} onChange={handleChange} />
        </div>
        <div>
        <div className="label">  <label for="password">Password</label></div>
        <input type="password" className='password' id="password" name="password" value={inputs.password} onChange={handleChange} />
        </div>
        <div className='forgotPassword'><NavLink to="/forgotPassword">Forgot Password?</NavLink> </div>
        <div className='btn'>
        <button type="submit" className='LoginBtn'>Login</button>
        
        </div>
        
      </form>

    </div>
  )
}

export default Signin
