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
import CartPage from './pages/CartPage'
import WishlistPage from './pages/WishlistPage'
function App() {
  return (
    <Routes>
      <Route path = "/Login" element ={<LoginPage/>}  />
      <Route path = "/register" element ={<RegisterPage/>}  />
      <Route path = "/" element ={<Home/>}  />
      <Route path = "/shop" element ={<Shop/>}  />
      <Route path = "/admin" element ={<AdminPanel/>}  />
      <Route path="/About" element={<AboutPage/>} />
      <Route path='/Blog' element={<BlogPage/>}/>
      <Route path='/contact' element={<ContactPage/>} />
      <Route path='/cart' element={<CartPage/>} />
      <Route path='/wishlist' element={<WishlistPage/>} />
      {/* <Route path='/wishlist' element={<WishlistTestPage/>} /> */}
    </Routes>
 
  )
}

export default App
