import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/layout.css";
import LandingPage from "./LandingPage";
import UserProfile from "./UserProfile";
import ProductDetails from "./ProductDetails";
import Login from "./Login";
import Signup from "./Signup";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="contents">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/product" element={<ProductDetails />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default Layout;
