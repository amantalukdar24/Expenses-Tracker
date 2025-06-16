import React,{useEffect, useState} from 'react'
import {NavLink,useLocation} from "react-router-dom"
import "../styles/Sidebar.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {faHome,faChartLine,faGear} from "@fortawesome/free-solid-svg-icons"
function Sidebar() {
  const [user,setUser]=useState("");
 const Location=useLocation();

    const userDetails=async (req,res)=>{
      const response=await fetch('https://expenses-tracker-backend-hvnc.onrender.com/user/info',{
        method:"GET",
        headers:{
          "Content-Type":"application/json",
          "authorization":localStorage.getItem('token'),
        }
      });
      const data=await response.json();
      setUser(data);
     
    }
    useEffect(()=>{
         userDetails();
    },[Location.pathname])
   
  
  return (<>
    <div className="Sidebar">
      <div className="Profile">
      <div class="profile-Image">
          <img src={`/Images/Avatar/${ user.avatarName}`} width="100px" height="100px"/>
        </div>
        <div className="profile-name">
          <h4>{user.fullName}</h4>
        </div>
      </div>
     <div className="sidebarLinks">
      <div className='sidebarItems' >
        <FontAwesomeIcon icon={faHome} size="lg"/>
        <NavLink to="/Home"><li >Home</li></NavLink>
      </div>
      <div className='sidebarItems'>
        <FontAwesomeIcon icon={faChartLine} size="lg" />
        <NavLink to="/Dashboard"><li >Dashboard</li></NavLink>
        </div>
      <div className='sidebarItems'>
        <FontAwesomeIcon icon={faGear} size="lg" />
        <NavLink to="/Settings"><li >Settings</li></NavLink>
        </div>
        
         
         
     </div>
    </div>
   <div className='Sidebar1'>
    <NavLink to='/Home'> <FontAwesomeIcon icon={faHome} size="3x" color='black'/></NavLink>
    <NavLink to='/Dashboard'> <FontAwesomeIcon icon={faChartLine} size="3x" color='black'/></NavLink>
    <NavLink to='/Settings'> <FontAwesomeIcon icon={faGear} size="3x" color='black'/></NavLink>
    <div className='Profile1'>
       <img src={`/Images/Avatar/${ user.avatarName}`} width="50px" height="50px"/>
       <h4>{user.fullName}</h4>
    </div>
   </div>
    </>
  )
}

export default Sidebar
