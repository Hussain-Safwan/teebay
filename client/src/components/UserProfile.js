import { Button } from "@mui/material";
import React from "react";
import ProductList from "./ProductList";
import "../styles/user-profile.css";

const UserProfile = () => {
  return (
    <div>
      <div className="first-row">
        <h2>My Products</h2>
        <div className="buttons">
          <Button variant="outlined">Add Product</Button>
          <Button variant="outlined" color="error">
            Logout
          </Button>
        </div>
      </div>
      <ProductList />
    </div>
  );
};

export default UserProfile;
