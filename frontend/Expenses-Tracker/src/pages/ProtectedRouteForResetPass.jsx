import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
function ProtectedRouteForResetPass({otpValidate}) {
 
  return (
    <div>
        {
            otpValidate? <Outlet/> : <Navigate to='/Settings'/>
        }

    </div>
  )
}

export default ProtectedRouteForResetPass