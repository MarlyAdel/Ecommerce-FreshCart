import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import styles from "./Layout.module.css";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";

export default function Layout() {
  const [count, setCount] = useState(0);
  return (
    <div>
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
}
