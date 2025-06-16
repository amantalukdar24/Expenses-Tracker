import React, { useEffect,useState } from 'react'
import {useLocation,useNavigate} from "react-router-dom"
function RefreshHandler({setIsLoggedIn,setNavLogin}) {
    
    const Location=useLocation();
    const Navigate=useNavigate();
    useEffect(()=>{
        if(localStorage.getItem('token'))
        {
            setIsLoggedIn(true);
            if(Location.pathname==='/Signin' || Location.pathname==="/Signup" || Location.pathname==="/")
            {
                Navigate("/Home");
            }

        }
        else
        {
            setIsLoggedIn(false);
            if(Location.pathname==='/Home' || Location.pathname==='/Dashboard' || Location.pathname==='/Settings' || Location.pathname==='/verify' || Location.pathname==='/changeAvatar')
            {
               
                Navigate('/')
               
               
            }
            
        }
        if(Location.pathname!=="/Signin" || Location.pathname!=="/Signup")
            {
                setNavLogin(false);
            }
            if(Location.pathname==="/Signin" || Location.pathname==="/Signup" || Location.pathname==="/forgotPassword")
                {
                    setNavLogin(true);
                }
     
    },[setIsLoggedIn,Navigate,Location,setNavLogin])
  return (
   null
  )
}

export default RefreshHandler