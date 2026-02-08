import React, { useEffect, useState } from 'react'
import './loginAndReg.css'
import image1 from '../../assets/AuthSlide/1.webp'
import image2 from '../../assets/AuthSlide/2.webp'
import image3 from '../../assets/AuthSlide/3.webp'
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

    const [pageValue, setPageValue] = useState('login');
    const handlePageValue = (value) => {
        setPageValue(value);
    }

    const slideImages = [image1, image2, image3, image4];
    const [currentImage, setCurrentImage] = useState(image4);
    useEffect(()=>{
        let randomIndex
        do {
            randomIndex = Math.floor(Math.random() * slideImages.length)
        } while (slideImages[randomIndex] === currentImage)
        setCurrentImage(slideImages[randomIndex]);
    },[])

    const [eyeValue, setEyeValue] = useState({
        password: false,
        confirmPassword: false,
    });
    const handleEyeValue = (field) => {
        setEyeValue({
            ...eyeValue,
            [field]: !eyeValue[field],
        });
    }

    const [userInputs,setUserInputs] = useState({
        username: '',
        email: '', 
        password: '',
        confirmPassword: '',
    });

    const handleUserInputs=(e) => {
        setUserInputs({
            ...userInputs,
            [e.target.name]: e.target.value,
        });
    }

    const [checkBoxValue, setCheckBoxValue] = useState(false);
    const handleCheckBox=(e) => {
        setCheckBoxValue(e.target.checked);
    }

    const handleSubmit=(e)=>{
        e.preventDefault()
        if(checkBoxValue === false && pageValue === 'register'){
            console.log('Please agree to the terms and conditions');
            return;
        }
        console.log(userInputs);
    }

    return (
        <div className="loginAndReg">
            <div className="leftSec">
                <img className='slideImg' src={currentImage} alt="Auth illustration" />
            </div>
            <div className="rightSec">
                <div className="titleSec">
                    <h1>{pageValue === 'login' ? 'Welcome Back!' : 'Create an account'}</h1>
                    <span>Already have an account? <a onClick={() => handlePageValue(pageValue === 'login' ? 'register' : 'login')} href="#">{pageValue === 'login' ? 'Register' : 'Login'}</a></span>
                </div>
                <form className='authForm' onSubmit={handleSubmit}>
                    {pageValue === 'register' ?
                    <input onChange={handleUserInputs} type="text" name='username' placeholder='Username' /> : null}
                    <input onChange={handleUserInputs} type="text" name='email' placeholder='Email'/>
                    <div className="passWrapper">
                        <input onChange={handleUserInputs} type={eyeValue.password ? "text" : "password"} name='password' placeholder='Password'/>
                        {eyeValue.password ? <FaRegEyeSlash className='eyeIcon' onClick={() => handleEyeValue('password')}/> :
                        <FaRegEye  className='eyeIcon' onClick={() => handleEyeValue('password')}/>}
                    </div>
                    {pageValue === 'register' ?
                        <>
                        <div className="passWrapper">
                            <input onChange={handleUserInputs} type={eyeValue.confirmPassword ? "text" : "password"} name='confirmPassword' placeholder='Confirm Password'/>
                            {eyeValue.confirmPassword ? <FaRegEyeSlash className='eyeIcon' onClick={() => handleEyeValue('confirmPassword')}/> :
                            <FaRegEye  className='eyeIcon' onClick={() => handleEyeValue('confirmPassword')}/>}
                        </div>
                        <div className="checkboxSec">
                            <input onChange={handleCheckBox} type="checkbox" />
                            <span>I agree to the terms and conditions</span>
                        </div>
                        </>
                    : null}
                    <button type='submit' >{pageValue === 'login' ? 'Login' : 'Create Account'}</button>
                </form>
                <div className="divider">
                    <span>Or</span>
                </div>
                <div className="googleAccSec">
                    <FcGoogle />
                </div>
            </div>
        </div>
    )
}

export default LoginAndReg