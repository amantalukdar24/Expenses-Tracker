import React, { useState } from 'react'
import { Link,NavLink,useNavigate} from 'react-router-dom'
import "../styles/Navbar.css"

function Navbar({setIsLoggedIn,isLoggedIn}) {
  const Navigate=useNavigate()

    const handleLogout=()=>{
      setIsLoggedIn(false);
      localStorage.removeItem("token");
      Navigate("/");
  
    }
  return (
    <div className="navbar">
      <h1 className='nav-header'>Expenses Tracker</h1>
 
       
      <div className='authentication'>
        
      {isLoggedIn?
     
       <><button className="Logout" onClick={handleLogout}>Logout</button></>
     :  <><Link to="/Signin"><button className="Signin">Signin</button></Link><Link to="/Signup"><button className='Register'>Register</button></Link></>
      }
       </div> 

 
    </div>
  )
}

export default Navbar