import { useState } from 'react'
import Home from './pages/Home'
import RegisterPage from './pages/RegisterPage'
import Login from './pages/Login'

import Payment from './pages/Payment'
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import {useAuth} from '../src/context/AuthProvider'
function App() {
  const [count, setCount] = useState(0)
  const [authUser,setAuthUser] = useAuth()
  return (
    <>
      <Toaster position="top-center" />
      <BrowserRouter>

        <Routes>
            
            <Route path='/' element={<Home />} />
            <Route path='/register'element={<RegisterPage/>}/>
            <Route path='/login'element={<Login/>}/>
            <Route path='/payment' element ={authUser?<Payment/>:<Navigate to="/login"/>}></Route>
            {/* <Route path="blogs" element={<Blogs />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NoPage />} /> */}
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
