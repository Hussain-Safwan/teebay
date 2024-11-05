import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/layout.css";
import LandingPage from "./LandingPage";
import UserProfile from "./UserProfile";
import ProductDetails from "./ProductDetails";

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
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default Layout;
