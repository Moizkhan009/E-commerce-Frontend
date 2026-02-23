import React from 'react'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import Home from './pages/Home'
import { Route , Routes } from 'react-router-dom'
import Shop from './pages/shop'
import AdminPanel from './Admin/AdminPanel'
import AboutPage from './pages/About'
import BlogPage from './pages/Blog'
import ContactPage from './pages/Contact'
function App() {
  return (
    <Routes>
      <Route path = "/" element ={<LoginPage/>}  />
      <Route path = "/register" element ={<RegisterPage/>}  />
      <Route path = "/home" element ={<Home/>}  />
      <Route path = "/shop" element ={<Shop/>}  />
      <Route path = "/admin" element ={<AdminPanel/>}  />
      <Route path="/About" element={<AboutPage/>} />
      <Route path='/Blog' element={<BlogPage/>}/>
      <Route path='/contact' element={<ContactPage/>} />
      </Routes>
 
  )
}

export default App
