import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet, useLocation } from "react-router-dom";

export default function Layout() {
  const location = useLocation();

  const hideFooter = location.pathname === "/login" || location.pathname === "/register";
  
  return (
    <div>
      <Navbar />

      <Outlet />

      {!hideFooter && <Footer />}
    </div>
  );
}
