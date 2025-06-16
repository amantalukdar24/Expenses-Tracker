import React from 'react'
import { NavLink } from 'react-router-dom'
import "../styles/Footer.css"

function Footer() {
  return (
    <div className="Footer">
        <div className="QuickLinks">
              <h1>Quick Links</h1>
            <div className='footerLinks'><NavLink to='/Home'>Home</NavLink></div>
            <div className='footerLinks'><NavLink to='/Dashboard'>Dashboard</NavLink></div>
            
        </div>
        <div className='SocialLinks'>
        <h1>Social Links</h1>
        <div className='footerLinks'><NavLink to='https://www.linkedin.com/in/aman-talukdar-611391184/' target="_blank">LinkedIn</NavLink> </div>
        <div className='footerLinks'><NavLink to='https://github.com/amantalukdar24' target='_blank'>GitHub</NavLink></div>
        </div>
        <div className='ContactUs'>
            <h1>Contact Us</h1>
            <div className='emailFooter'>Email:amantalukdar24@gmail.com</div>
        </div>
        <div className='RightReserve'>
            <h1>@2025 Expenses-Tracker.All Rights Reserved</h1>
        </div>
     </div>
  )
}

export default Footer