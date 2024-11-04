import React from "react";
import Navbar from "./Navbar";
import "../styles/layout.css";
import ProductList from "./ProductList";

const Layout = () => {
  return (
    <div>
      <Navbar />
      <div className="contents">
        <ProductList />
      </div>
    </div>
  );
};

export default Layout;
