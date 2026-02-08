import React from 'react'
import './logoLoader.css'
import logo from '../../assets/Logo/chatigoLogo.png'

const LogoLoader = () => {
  return (
    <div className="logoLoader">
        <img src={logo} alt="Chatigo Logo" />
    </div>
  )
}

export default LogoLoader