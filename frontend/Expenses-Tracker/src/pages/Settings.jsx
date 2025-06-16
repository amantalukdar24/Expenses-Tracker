import React,{useEffect,useState} from 'react'
import { useNavigate,NavLink,Outlet} from 'react-router-dom';
import { toast } from 'react-toastify';
import "../styles/Settings.css"
function Settings() {
    const Navigate=useNavigate();
    const [activateWarning,setActivateWarning]=useState(false);
    const deleteBtn=()=>{
        setActivateWarning(!activateWarning);
    }
    const handleUserDelete=async ()=>{
        const response=await fetch("https://expenses-tracker-backend-hvnc.onrender.com/user/delete",{
            method:"DELETE",
            headers:{
                "Content-Type":"application/json",
                "authorization":localStorage.getItem('token'),
            }
        });
        const data=await response.json();
        console.log(data)
        if(data.success===true)
        {
            localStorage.removeItem('token');
            setActivateWarning(!activateWarning);
            Navigate('/');
        }
        else{
            alert("Something Went Wrong");
        }
    }
    const handleGenrateOtp=async ()=>{
        const response=await fetch('https://expenses-tracker-backend-hvnc.onrender.com/user/getOtp',{
            method:"GET",
            headers:{
                "Content-Type":"application/json",
                "authorization":localStorage.getItem('token')
            }
        });
        const data=await response.json();
        
        if(data.success)
        {
            toast.success(data.message,{position:"top-center",autoClose:10000});
        }
        else{
            toast.error(data.message,{position:"top-center",autoClose:10000});
        }
    }
  return (
    <div className='Settings'>
        
        <div className="updateBar">
            <h2>Change Your Avatar</h2>
         <div><NavLink to='/avatar'>  <button className="Change">Change</button></NavLink></div> 
        </div>
        <div className="updateBar">
            <h2>Change Password</h2>
         <div><NavLink to="/verify"><button className="Change"  onClick={handleGenrateOtp}>Update</button></NavLink></div>   
        </div>
        <div className="updateBar">
            <h2>Delete Your Account</h2>
            <button className="Delete" onClick={deleteBtn}>Delete</button>
        </div>
        {activateWarning &&
            <div className="WarningBar">
            <p>Do You Want Delete Your Account?</p>
            <div className="btns">
                <button className="Yes" onClick={handleUserDelete}>Yes</button>
                <button className="No" onClick={deleteBtn}>No</button>
            </div>
        </div>
        
}
    </div>
  )
}

export default Settings
