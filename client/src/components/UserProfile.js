import React, { useState } from "react";
import { Button } from "@mui/material";

import ProductList from "./ProductList";
import "../styles/user-profile.css";
import ProductAddEditModal from "./ProductAddEditModal";

const UserProfile = () => {
  const [openProductModal, setOpenProductModal] = useState(false);

  const handleAddProduct = () => {
    console.log("deleted");
  };

  const closeProductModal = () => setOpenProductModal(false);

  return (
    <div>
      <ProductAddEditModal
        open={openProductModal}
        handleAction={handleAddProduct}
        handleClose={closeProductModal}
        title={"Add Product"}
        actionBtnText={"Submit"}
        cancelBtnText={"Cancel"}
      />
      <div className="first-row">
        <h2>My Products</h2>
        <div className="buttons">
          <Button variant="outlined" onClick={() => setOpenProductModal(true)}>
            Add Product
          </Button>
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
