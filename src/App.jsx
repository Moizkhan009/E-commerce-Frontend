// // import React from  'react'
// import LoginPage from './pages/login'
// import RegisterPage from './pages/register'
// import Home from './pages/Home'
// import { Route , Routes } from 'react-router-dom'
// import Shop from './pages/shop'
// import AdminPanel from './Admin/AdminPanel'
// import AboutPage from './pages/About'
// import BlogPage from './pages/Blog'
// import ContactPage from './pages/Contact'
// import CartPage from './pages/CartPage'
// import WishlistPage from './pages/WishlistPage'
// import { Toaster } from 'react-hot-toast';
// import ProductDetailPage from './pages/Productdetailpage'
// import Header from './components/header'
// import React ,{useEffect,useState} from 'react'
// // import Profile from './pages/profilePage'
// import Profile from './pages/Profile'
// // import Checkout from './pages/CheckoutPage'
// import CheckoutPage from './pages/CheckoutPage'
// import AdminRoute from './Admin/AdminRoutes/AdminRoutes'
// function App() {
// const [isAuth,userInfo ,setIsAuth] = useState(false);
// // useEffect(() => {
// //   const checkAuth = async () => {
// //     const userInfo = localStorage.getItem("userInfo");

// //     if (!userInfo) {
// //       setIsAuth(false);
// //       return;
// //     }

// //     try {
// //       const res = await fetch("http://localhost:5000/api/users/profile", {
// //         headers: {
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });

// //       if (!res.ok) throw new Error();

// //       setIsAuth(true);   
// //       console.log("User logged in");

// //     } catch (err) {
// //       console.log("User not valid");
// //       localStorage.removeItem("userInfo");
// //       setIsAuth(false);
// //     }
// //   };

// //   checkAuth();
// // }, []);
// useEffect(() => {
//   const checkAuth = async () => {
//     const stored = localStorage.getItem("userInfo");

//     if (!stored) {
//       setIsAuth(false);
//       return;
//     }

//     // const userInfo = JSON.parse(stored);
//     const userInfo = JSON.parse(localStorage.getItem("userInfo") || "null");
//     const token = userInfo?.token;

//     if (!token) {
//       setIsAuth(false);
//       return;
//     }

//     try {
//       const res = await fetch("http://localhost:5000/api/users/profile", {
//         headers: {
//           Authorization: `Bearer ${userInfo.token}`,
//         },
//       });

//       if (!res.ok) throw new Error();

//       setIsAuth(true);
//     } catch (err) {
//       localStorage.removeItem("userInfo");
//       setIsAuth(false);
//     }
//   };

//   checkAuth();
// }, []);


//   return (
//     <>
//      {/* This is a temporary authentication status display. You can remove it once you have a proper authentication flow in place. */}
//  {/* <div style={{ padding: "10px", background: isAuth ? "green" : "red", color: "white" }}>
//       {isAuth ? "USER LOGGED IN ✅" : "USER NOT LOGGED IN ❌"}
//     </div> */}
//     <Toaster/>
//     <Header isAuth={isAuth} userInfo={userInfo}/>
//     {/* <Header isAuth={isAuth} userInfo={userInfo} setIsAuth={setIsAuth}/> */}
//     <Routes>
//       <Route element={<AdminRoute />}>
//   <Route path="/admin" element={<AdminPanel />} />
// </Route>
//       {/* <Route path='/admin' element={<AdminPanel />} /> */}
//       <Route path = "/product/:id" element={<ProductDetailPage/>} />
//       <Route path = "/Login" element ={<LoginPage setIsAuth={setIsAuth}/>}  />
//       <Route path = "/register" element ={<RegisterPage/>}  />
//       <Route path = "/" element ={<Home/>}  />
//       <Route path = "/shop" element ={<Shop/>}  />
//       <Route path = "/admin" element ={<AdminPanel/>}  />
//       <Route path="/About" element={<AboutPage/>} />
//       <Route path='/Blog' element={<BlogPage/>}/>
//       <Route path='/contact' element={<ContactPage/>} />
//       <Route path='/cart' element={<CartPage/>} />
//       <Route path='/wishlist' element={<WishlistPage/>} />
//       <Route path='/profile' element={<Profile setIsAuth={setIsAuth} />} />
//       <Route path='/checkout' element={<CheckoutPage />} />
//       {/* <Route path='/profile' element={<Profile/>} /> */}
//       {/* <Route path='/wishlist' element={<WishlistTestPage/>} /> */}
//     </Routes>
// </>
 
//   )
// }

// export default App



// import React from  'react'
import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Home from "./pages/Home";
import Shop from "./pages/shop";
import AdminPanel from "./Admin/AdminPanel";
import AboutPage from "./pages/About";
import BlogPage from "./pages/Blog";
import ContactPage from "./pages/Contact";
import CartPage from "./pages/CartPage";
import WishlistPage from "./pages/WishlistPage";
import ProductDetailPage from "./pages/Productdetailpage";
import Header from "./components/header";
import Profile from "./pages/Profile";
import CheckoutPage from "./pages/CheckoutPage";
import AdminRoute from "./Admin/AdminRoutes/AdminRoutes";
import MyOrders from "./pages/Order";
import ProductForm from "./Admin/components/ProductForm";
import SectionTestPage from "./pages/SectionTestPage";
import HotDealsPage from "./pages/HotDeals";

function App() {
const location = useLocation();
  // ✅ Auth state
  const [isAuth,setIsAuth,] = useState(false);


  
  // ✅ UserInfo from localStorage
  const [userInfo, setUserInfo] = useState(
    JSON.parse(localStorage.getItem("userInfo")) || null
  );

  // ✅ Page refresh par auth check
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));

    if (storedUser?.token) {
      setIsAuth(true);
      setUserInfo(storedUser);
    } else {
      setIsAuth(false);
      setUserInfo(null);
    }
  }, []);

  return (
    <>
      <Toaster />

      {/* ✅ Header */}
      {location.pathname.startsWith("/admin") ? null : (
      <Header
        isAuth={isAuth}
        setIsAuth={setIsAuth}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      )}

      <Routes>

        {/* ✅ Admin Route */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminPanel  setIsAuth={setIsAuth} />} />
          {/* <Route path="/addproduct" element={ProductForm}/> */}
        </Route>

        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <LoginPage
              isAuth={isAuth}
              userInfo={userInfo}
              setIsAuth={setIsAuth}
              setUserInfo={setUserInfo}

            />
          }
        />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/Blog" element={<BlogPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/wishlist" element={<WishlistPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/orders" element={<MyOrders />} />
        <Route path="/s" element={<SectionTestPage/>}/>
        <Route path="/deals" element={<HotDealsPage/>}/>


        {/* Product */}
        <Route
          path="/product/:id"
          element={<ProductDetailPage />}
        />

        {/* Profile */}
        <Route
          path="/profile"
          element={
            <Profile
              setIsAuth={setIsAuth}
              setUserInfo={setUserInfo}
            />
          }
        />

      </Routes>
    </>
  );
}

export default App;