import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Navbar";
import "../styles/layout.css";
import LandingPage from "./LandingPage";
import UserProfile from "./UserProfile";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="contents">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
};

export default Layout;
