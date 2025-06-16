import React,{useState} from 'react'
import { toast } from 'react-toastify'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {faLeftLong} from "@fortawesome/free-solid-svg-icons"
import "../styles/Avatar.css"
import { useNavigate } from 'react-router-dom';
function Avatar() {
  const avatarLinks = [
    "man.png", "woman.png", "woman (1).png", "panda.png", "hacker.png", "gamer.png", "profile.png"
  ];
  const [avatarName,setAvatarName]=useState("");

  const Navigate=useNavigate();
  const handleFocus=(e)=>{
    setAvatarName(e.target.id);
  }
  const handleSubmit=async (e)=>{
    e.preventDefault();
  
    const response=await fetch('https://expenses-tracker-backend-hvnc.onrender.com/user/changeAvatar',{
      method:"POST",
      headers:{
        "Content-Type":"application/x-www-form-urlencoded",
           "authorization":localStorage.getItem('token')
      },
      body:new URLSearchParams({avatar:avatarName})
    });
    const data=await response.json();

    if(data.success)
    {
      toast.success(data.message);
      Navigate('/Home');
      
    }
    else{
      toast.error(data.message)
    }
  }
  return (
    <div className="Avatar">
        <div className="avatarHeader">
           <button className="returnBack" onClick={()=>Navigate('/Settings')}>
            <FontAwesomeIcon icon={faLeftLong} size={'3x'} />
           </button>
           <h1>Change Your Avatar</h1>
        </div>
        <div className='avatarBody'>
           { avatarLinks.map((ele,index)=>(
            <div className='avatars' id={ele} onFocus={handleFocus} tabIndex={index}>
                <img src={`/Images/Avatar/${ele}`}  alt={`avatar-${index}`}  width="100px" height="100px"/>
            </div>
           ))
           }
        </div>
        <button className='saveAvatar' onClick={handleSubmit}>Save</button>
    </div>
  )
}

export default Avatar
