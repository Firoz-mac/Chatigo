import './App.css'
import { useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import LoginAndReg from './pages/LoginAndReg/LoginAndReg'

function App() {

  //intializing the theme value to dark
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'dark')
  }, [])

  return (
    <>
    <Routes>
      <Route path='/SignUp' element={<LoginAndReg/>}/>
    </Routes>
    </>
  )
}

export default App
