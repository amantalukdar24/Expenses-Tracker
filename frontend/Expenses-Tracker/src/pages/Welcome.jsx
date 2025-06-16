import React from 'react'
import {useNavigate} from "react-router-dom"
import "../styles/Welcome.css"
function Welcome({setNavLogin}) {
    const navigate=useNavigate();

    const handleJoin=()=>{
      setNavLogin(true);
    
      navigate("/Signup");
   
      
    }
  return (
    <div className="Welcome">
    <div className="welcomebody">
      <div className="bg-container"></div>
       <div className="WelcomeText">
        <h1>Track Your Expenses,Savings,Visualize with interactive dashboard.</h1>
        <button className="JoinBtn" onClick={handleJoin}>Join Us Now</button>
       </div>
    </div>
    </div>
  )
}

export default Welcome