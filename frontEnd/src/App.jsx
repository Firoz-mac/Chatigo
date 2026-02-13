import './App.css'
import { useEffect, useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginAndReg from './pages/LoginAndReg/LoginAndReg'
import LogoLoader from './components/logoLoader/LogoLoader'
import Home from './pages/home/Home'
import ProtectedRoutes from './protectedRoutes'
import authStore from './store/authStore'

function App() {
  const [loading, setLoading] = useState(true)
  const {login} = authStore();
  
  //Hydrate Store On App Load
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("chatigo"));

    if (stored?.token) {
      login(stored.user, stored.token);
    }
  }, []);

  //intializing the theme value to dark
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')

    const timer = setTimeout(() => {
      setLoading(false)
    }, 1800)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return <LogoLoader/>
  }

  return (
    <>
    <Routes>
      <Route path='/' element={<LoginAndReg/>}/>
      <Route path='/chatigo' element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>
    </Routes>
    </>
  )
}

export default App
