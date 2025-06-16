import { useState } from 'react'
import "./App.css"
import Navbar from './components/Navbar'
import RefreshHandler from './RefreshHandler.js'
import { Outlet } from 'react-router-dom'
import Sidebar from './pages/Sidebar'
import Welcome from './pages/Welcome'
import Footer from './components/footer'
import { Slide, ToastContainer } from 'react-toastify';
function App() {
 
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [navLogin,setNavLogin]=useState(false);
  return (
   <>
   <ToastContainer postion="top-right" autoClose={5000} transition={Slide} pauseOnHover={false} closeOnClick={false} theme='dark' delay=
   {1000} limit={5}/>
   <RefreshHandler setIsLoggedIn={setIsLoggedIn} setNavLogin={setNavLogin}/>
   <header>
    <Navbar setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>
  
   </header>
   <main>
     {isLoggedIn && <Sidebar/>}
     {!isLoggedIn && !navLogin && <Welcome setNavLogin={setNavLogin}/>}
     <div className="Outlets">
     <Outlet/>
     </div>
    
    </main>
    <footer>
  <Footer/>
    </footer>
   </>
  )
}

export default App
