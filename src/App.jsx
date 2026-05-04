// import React from  'react'
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
import { Toaster } from 'react-hot-toast';
import ProductDetailPage from './pages/Productdetailpage'
import React ,{useEffect,useState} from 'react'

function App() {
const [isAuth, setIsAuth] = useState(false);

useEffect(() => {
  const checkAuth = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setIsAuth(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error();

      setIsAuth(true);
      console.log("User logged in");

    } catch (err) {
      console.log("User not valid");
      localStorage.removeItem("token");
      setIsAuth(false);
    }
  };

  checkAuth();
}, []);



  return (
    <>
     {/* This is a temporary authentication status display. You can remove it once you have a proper authentication flow in place. */}
 {/* <div style={{ padding: "10px", background: isAuth ? "green" : "red", color: "white" }}>
      {isAuth ? "USER LOGGED IN ✅" : "USER NOT LOGGED IN ❌"}
    </div> */}
    <Toaster/>
    <Routes>
      <Route path = "/product/:id" element={<ProductDetailPage/>} />
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
</>
 
  )
}

export default App
