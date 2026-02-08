import React from 'react'
import './loginAndReg.css'
import image4 from '../../assets/AuthSlide/4.webp'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

const LoginAndReg = () => {
    // const toggleTheme = () => {
    //     const current = document.documentElement.getAttribute('data-theme')
    //     document.documentElement.setAttribute(
    //         'data-theme',
    //         current === 'dark' ? 'light' : 'dark'
    //     )
    // }
    return (
        <div className="loginAndReg">
            <div className="leftSec">
                <img className='slideImg' src={image4} alt="" />
            </div>
            <div className="rightSec">
                <div className="titleSec">
                    <h1>Create an account</h1>
                    <span>Already have an account? Login</span>
                </div>
                <form className='authForm' action="submit">
                    <input type="text" placeholder='Username' />
                    <input type="text" placeholder='Email'/>
                    <div className="passWrapper">
                        <input type="text" placeholder='Password'/>
                        <FaRegEye />
                    </div>
                    <div className="passWrapper">
                        <input type="text" placeholder='Confirm Password'/>
                        <FaRegEye />
                    </div>
                    <div className="checkboxSec">
                        <input type="checkbox" />
                        <span>I agree to the terms and conditions</span>
                    </div>
                    <button type='submit'>Create Account</button>
                </form>
                <div className="googleAccSec">
                    <FcGoogle />
                    <span>Google</span>
                </div>
            </div>
        </div>
    )
}

export default LoginAndReg