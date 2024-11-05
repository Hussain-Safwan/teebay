import React from "react";
import Navbar from "./Navbar";
import "../styles/layout.css";
import ProductList from "./ProductList";
import LandingPage from "./LandingPage";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="contents">
        <LandingPage />
      </div>
    </div>
  );
};

export default Layout;
