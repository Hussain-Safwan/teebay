import React from "react";
import ProductCard from "./ProductCard";
import "../styles/products.css";

const ProductList = ({ productList }) => {
  return (
    <div className="product-list">
      {productList.map((item) => (
        <ProductCard product={item} />
      ))}
    </div>
  );
};

export default ProductList;
