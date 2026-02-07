import './App.css'
import { Routes, Route } from 'react-router-dom'
import LoginAndReg from './pages/LoginAndReg/LoginAndReg'

function App() {

  return (
    <>
    <Routes>
      <Route path='/SignUp' element={<LoginAndReg/>}/>
    </Routes>
    </>
  )
}

export default App
