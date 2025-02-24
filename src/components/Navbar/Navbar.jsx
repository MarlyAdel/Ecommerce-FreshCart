import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import logo from '../../assets/Images/freshcart-logo.svg'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { counterContext } from '../../Context/counterContext'
import { tokenContext } from '../../Context/tokenContext'
import { cartContext } from '../../Context/CartContext'

export default function Navbar() {
  let { token, setToken } = useContext(tokenContext);
  let navigate = useNavigate();
  let { numOfCartItems } = useContext(cartContext);
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();
  const hideNavLinks =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password" ||
    location.pathname === "/verify-code" ||
    location.pathname === "/reset-password";

  //* SignOut
  function logOut() {
    localStorage.removeItem("userToken");
    setToken(null);
    navigate("/login");
  }

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        {/* Logo (Left) */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img src={logo} width="200px" alt="project-logo" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden p-2 w-10 h-10 text-gray-500 rounded-lg hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            )}
          </svg>
        </button>

        {/* Desktop Navigation (Hidden on login/register) */}
        {!hideNavLinks && (
          <ul className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 space-x-6 font-medium">
            <li><NavLink to="/" className="text-gray-900 dark:text-white">Home</NavLink></li>
            <li><NavLink to="/products" className="text-gray-900 dark:text-white">Products</NavLink></li>
            <li><NavLink to="/categories" className="text-gray-900 dark:text-white">Categories</NavLink></li>
            <li><NavLink to="/brands" className="text-gray-900 dark:text-white">Brands</NavLink></li>
          </ul>
        )}

        {/* Right-side Buttons */}
        <div className="hidden md:flex items-center space-x-4">
          {token ? (
            <>
              <Link to="/wishList" className="text-gray-900 dark:text-white">
                Wishlist <i className="fa-solid fa-heart text-2xl text-red-600"></i>
              </Link>
              <div className="relative">
                <Link to="/cart" className="text-gray-900 dark:text-white">
                  <i className="fa-solid fa-cart-shopping text-main text-2xl"></i>
                  {numOfCartItems > 0 && (
                    <span className="absolute -top-3 -right-3 bg-green-500 text-white font-bold w-5 h-5 flex items-center justify-center rounded-full p-3">
                      {numOfCartItems}
                    </span>
                  )}
                </Link>
              </div>
              <span className="cursor-pointer font-medium text-red-500" onClick={logOut}>
                Sign Out
              </span>
            </>
          ) : (
            <>
              <NavLink to="/register" className="text-gray-900 dark:text-white">Register</NavLink>
              <NavLink to="/login" className="text-gray-900 dark:text-white">Login</NavLink>
            </>
          )}
        </div>
      </div>

      {/* Mobile Navigation (Always exists but hides links when needed) */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"} bg-gray-100 dark:bg-gray-800 p-4`}>
        {!hideNavLinks && (
          <ul className="flex flex-col items-center space-y-4">
            <NavLink to="/" className="text-gray-900 dark:text-white">Home</NavLink>
            <NavLink to="/products" className="text-gray-900 dark:text-white">Products</NavLink>
            <NavLink to="/categories" className="text-gray-900 dark:text-white">Categories</NavLink>
            <NavLink to="/brands" className="text-gray-900 dark:text-white">Brands</NavLink>
          </ul>
        )}
        
        {/* Mobile Auth Links */}
        <div className="flex flex-col items-center space-y-4 mt-4">
          {token ? (
            <>
              <Link to="/wishList" className="text-gray-900 dark:text-white">
                Wishlist <i className="fa-solid fa-heart text-red-600"></i>
              </Link>
              <div className="relative">
                <Link to="/cart" className="text-gray-900 dark:text-white">
                  <i className="fa-solid fa-cart-shopping text-main text-2xl"></i>
                  {numOfCartItems > 0 && (
                    <span className="absolute -top-3 -right-3 bg-green-500 text-white font-bold w-5 h-5 flex items-center justify-center rounded-full p-3">
                      {numOfCartItems}
                    </span>
                  )}
                </Link>
              </div>
              <span className="cursor-pointer text-red-500" onClick={logOut}>
                Sign Out
              </span>
            </>
          ) : (
            <>
              <NavLink to="/register" className="text-gray-900 dark:text-white">Register</NavLink>
              <NavLink to="/login" className="text-gray-900 dark:text-white">Login</NavLink>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
