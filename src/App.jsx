import React from "react";
import { useContext, useEffect, useState } from 'react'
import './App.css'
import { createBrowserRouter,  RouterProvider } from 'react-router-dom'
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import Categories from "./components/Categories/Categories";
import Brands from "./components/Brands/Brands";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Cart from "./components/Cart/Cart";
import NotFound from "./components/NotFound/NotFound";
import { tokenContext } from './Context/tokenContext';
import ProtectedRoutes from './components/ProtectedRoutes/ProtectedRoutes';
import { AuthView } from './components/AuthView/AuthView';
import ProductDetails from './components/ProductDetails/ProductDetails';
import { ToastContainer } from 'react-toastify';
import Checkout from './components/Checkout/Checkout';
import AllOrders from './components/AllOrders/AllOrders';
import ForgotPassword from './components/ForgotPassword/ForgotPassword';
import VerifyCode from './components/VerifyCode/VerifyCode';
import ResetPassword from './components/ResetPassword/ResetPassword';
import WishList from './components/WishList/WishList';





function App() {

  const [count, setCount] = useState(0);

  let {setToken} = useContext(tokenContext);

  useEffect(() => {
    if(localStorage.getItem("userToken")){
      setToken(localStorage.getItem("userToken"));
    }
  },[])
 
  const routes = createBrowserRouter([
    {path:"", element: <Layout/>, children:[
      {index:true, element: <ProtectedRoutes><Home/></ProtectedRoutes> },
      {path:"categories", element:<ProtectedRoutes><Categories/></ProtectedRoutes> },
      {path:"brands", element: <ProtectedRoutes><Brands/></ProtectedRoutes> },
      {path:"products", element: <ProtectedRoutes><Products/></ProtectedRoutes> },
      {path:"login", element: <AuthView><Login/></AuthView> },
      {path:"register", element:<AuthView><Register/></AuthView> },
      {path:"cart", element: <ProtectedRoutes><Cart/></ProtectedRoutes> },
      {path:"productDetails/:id/:categoryId", element: <ProtectedRoutes><ProductDetails/></ProtectedRoutes> },
      {path:"checkout", element: <ProtectedRoutes><Checkout/></ProtectedRoutes> },
      {path:"/allorders", element: <AuthView><AllOrders/></AuthView> },

      {path:"/forgot-password", element: <AuthView><ForgotPassword/></AuthView> },
      {path:"/verify-code", element: <AuthView><VerifyCode/></AuthView> },
      {path:"/reset-password", element:<AuthView><ResetPassword/></AuthView>  },

      {path:"wishList", element: <ProtectedRoutes><WishList/></ProtectedRoutes> },



      {path:"*", element: <NotFound/>},
      
      
    ]}
  ])

  return (
    <>
      
        <RouterProvider router={routes} />
        <ToastContainer />
      
    </>
  );
}

export default App



// m1199@gmail.com
// M12345