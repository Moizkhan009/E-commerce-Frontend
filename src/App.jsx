import React from 'react'
import LoginPage from './pages/login'
import RegisterPage from './pages/register'
import Home from './pages/Home'
import { Route , Routes } from 'react-router-dom'
import Shop from './pages/shop'
import ProductDashboard from './Admin/productDashboard/ProductDashboard'; // correct

function App() {
  return (
    <Routes>
      <Route path = "/" element ={<LoginPage/>}  />
      <Route path = "/register" element ={<RegisterPage/>}  />
      <Route path = "/home" element ={<Home/>}  />
      <Route path = "/shop" element ={<Shop/>}  />
      <Route path = "/admin" element ={<ProductDashboard/>}  />
    </Routes>
 
  )
}

export default App
