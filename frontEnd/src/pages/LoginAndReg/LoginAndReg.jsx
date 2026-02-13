import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { useNavigate } from "react-router-dom";
import './loginAndReg.css';
import authStore from '../../store/authStore';
import api from '../../api/axios';
import image1 from '../../assets/AuthSlide/1.webp';
import image2 from '../../assets/AuthSlide/2.webp';
import image3 from '../../assets/AuthSlide/3.webp';
import image4 from '../../assets/AuthSlide/4.webp';
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

const LoginAndReg = () => {
    const slideImages = useMemo(() => [image1, image2, image3, image4], []);
    const { login } = authStore();
    
    const [pageValue, setPageValue] = useState('login');
    const [currentImage, setCurrentImage] = useState(image4);
    const navigate = useNavigate();
    const [eyeValue, setEyeValue] = useState({
        password: false,
        confirmPassword: false,
    });
    const [userInputs, setUserInputs] = useState({
        username: '',
        email: '', 
        password: '',
        confirmPassword: '',
    });
    const [checkBoxValue, setCheckBoxValue] = useState(false);

    // Random image selection on mount
    useEffect(() => {
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * slideImages.length);
        } while (slideImages[randomIndex] === currentImage);
        setCurrentImage(slideImages[randomIndex]);
    }, []);

    // Memoized callbacks to prevent unnecessary recreations
    const handlePageValue = useCallback((value) => {
        setPageValue(value);
    }, []);

    const handleEyeValue = useCallback((field) => {
        setEyeValue(prev => ({
            ...prev,
            [field]: !prev[field],
        }));
    }, []);

    const handleUserInputs = useCallback((e) => {
        setUserInputs(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    }, []);

    const handleCheckBox = useCallback((e) => {
        const checked = e.target.checked;
        setCheckBoxValue(checked);
    }, []);

    const handleSubmit = useCallback((e) => {
        e.preventDefault();
        if (checkBoxValue === false && pageValue === 'register') {
            console.log('Please agree to the terms and conditions');
            return;
        }
        console.log(userInputs);
    }, [checkBoxValue, pageValue, userInputs]);

    const isLogin = pageValue === 'login';
    const togglePageValue = useCallback(() => {
        handlePageValue(isLogin ? 'register' : 'login');
    }, [isLogin, handlePageValue]);

    //handle Create Account
    const handleCreateAccount=useCallback(async()=>{
        if(userInputs.password !== userInputs.confirmPassword){
            console.log('Passwords do not match');
            return;
        }
        if (checkBoxValue === false) {
            console.log('Please agree to the terms and conditions');
            console.log(checkBoxValue);
            return;
        }
        try{
            const res=await api.post('/auth/register',{
                userName:userInputs.username,
                email:userInputs.email,
                password:userInputs.password,
            });
            console.log(res.data);
        }catch(err){
            console.log(err.response.data);
        }
    },[userInputs, checkBoxValue]);

    //handle Login
    const handleLogin=useCallback(async()=>{
        try{
            const res=await api.post('/auth/login',{
                email:userInputs.email,
                password:userInputs.password,
            });
            console.log(res.data);
            const { token, data } = res.data;
            localStorage.setItem("chatigo",JSON.stringify({token}));

            login(data, token);

            if(res.data.token){
                navigate('/chatigo');
            }
        }catch(err){
            console.log(err.response.data);
        }
    },[userInputs]);

    return (
        <div className="loginAndReg">
            <div className="leftSec">
                <img className='slideImg' src={currentImage} alt="Auth illustration" loading="lazy" />
            </div>
            <div className="rightSec">
                <div className="titleSec">
                    <h1>{isLogin ? 'Welcome Back!' : 'Create an account'}</h1>
                    <span>Already have an account? <button onClick={togglePageValue} className="toggle-link">{isLogin ? 'Register' : 'Login'}</button></span>
                </div>
                <form className='authForm' onSubmit={handleSubmit}>
                    {!isLogin && (
                        <input onChange={handleUserInputs} type="text" name='username' placeholder='Username' required />
                    )}
                    <input onChange={handleUserInputs} type="text" name='email' placeholder='Email' required/>
                    <div className="passWrapper">
                        <input onChange={handleUserInputs} type={eyeValue.password ? "text" : "password"} name='password' placeholder='Password' required/>
                        <button 
                            type="button"
                            className='eyeIcon' 
                            onClick={() => handleEyeValue('password')}
                            aria-label="Toggle password visibility"
                        >
                            {eyeValue.password ? <FaRegEyeSlash /> : <FaRegEye />}
                        </button>
                    </div>
                    {!isLogin && (
                        <>
                        <div className="passWrapper">
                            <input onChange={handleUserInputs} type={eyeValue.confirmPassword ? "text" : "password"} name='confirmPassword' placeholder='Confirm Password'/>
                            <button 
                                type="button"
                                className='eyeIcon' 
                                onClick={() => handleEyeValue('confirmPassword')}
                                aria-label="Toggle confirm password visibility"
                            >
                                {eyeValue.confirmPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                            </button>
                        </div>
                        <div className="checkboxSec">
                            <input onChange={handleCheckBox} type="checkbox" />
                            <span>I agree to the terms and conditions</span>
                        </div>
                        </>
                    )}
                    <button onClick={isLogin? handleLogin : handleCreateAccount} type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>
                </form>
            </div>
        </div>
    )
}

export default LoginAndReg