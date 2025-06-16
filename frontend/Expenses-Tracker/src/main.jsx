import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Signin from './pages/Signin.jsx'
import Signup from './pages/Signup.jsx'
import Home from "./pages/Home.jsx"
import Dashboard from './pages/Dashboard.jsx'
import Settings from "./pages/Settings.jsx"
import UpdatePassForm from './pages/UpdatePassForm.jsx'
import Otp from './pages/Otp.jsx'
import Avatar from './pages/Avatar.jsx'
import ForgotPasswordForm from './pages/ForgotPasswordForm.jsx'
import ProtectedRouteForResetPass from './pages/ProtectedRouteForResetPass.jsx'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
 
} from "react-router-dom"; //new version



function MainApp(){
const [otpValidate,setOtpValidate]=useState(false);
const router =createBrowserRouter(
 
  createRoutesFromElements(
    <Route path="/" element={<App />}>
        <Route index path="Home" element={<Home/>}/>
  
        <Route path='Dashboard' element={<Dashboard/>}/>
        <Route path="Settings" element={<Settings/>}/>
        <Route path="verify" element={<Otp setOtpValidate={setOtpValidate}/>}/>
        <Route element={<ProtectedRouteForResetPass otpValidate={otpValidate}/>}>
        <Route path='resetPassword' element={<UpdatePassForm/>}/>
        </Route>
        <Route path="forgotPassword" element={<ForgotPasswordForm/>}/>
        <Route path='Avatar' element={<Avatar/>}/>
        <Route path="Signin" element={<Signin/>}/>
        <Route path="Signup" element={<Signup/>}/>
        
    </Route>
  )

);
  return <RouterProvider router={router} />

}
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <MainApp/>
     </StrictMode>,
)
