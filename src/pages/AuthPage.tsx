import React from 'react'
import  logo from '../assets/logo.png'
import './css/AuthPage.css';
import LoginFormComponent from '../components/LoginFormComponent';


function AuthPage() {
  return (
    <main className='login-span'>
        <section className='login-section'>
            <img src={logo}></img>
            <LoginFormComponent />     
        </section> 
    </main> 
  )
}



export default AuthPage