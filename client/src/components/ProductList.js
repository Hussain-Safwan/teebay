import React from "react";
import ProductCard from "./ProductCard";
import "../styles/products.css";

const ProductList = () => {
  return (
    <div className="product-list">
      {[1, 2, 3].map((item) => (
        <ProductCard />
      ))}
    </div>
  );
};

export default ProductList;
