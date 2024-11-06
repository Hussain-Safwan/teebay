import React, { useState } from "react";
import { Button } from "@mui/material";
import { gql, useQuery } from "@apollo/client";

import ProductList from "./ProductList";
import "../styles/user-profile.css";
import ProductAddEditModal from "./ProductAddEditModal";

const UserProfile = () => {
  const [openProductModal, setOpenProductModal] = useState(false);

  const handleAddProduct = () => {
    console.log("deleted");
  };

  const closeProductModal = () => setOpenProductModal(false);

  const productsQuery = gql`
    query Product_by_user_id {
      product_by_user_id(user_id: 1) {
        product_id
        title
        description
        categories
        selling_price
        renting_price
        renting_price_unit
        user_id
        bought_by
        rented_by
        creating_date
        buying_date
        renting_date
      }
    }
  `;
  const { error, loading, data } = useQuery(productsQuery);
  if (error) return <div>Error</div>;
  if (loading) return <div>Loading...</div>;
  console.log(data);
  return (
    <div>
      <ProductAddEditModal
        open={openProductModal}
        handleAction={handleAddProduct}
        handleClose={closeProductModal}
        title={"Add Product"}
        actionBtnText={"Submit"}
        cancelBtnText={"Cancel"}
        edit={false}
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
      <ProductList productList={data.product_by_user_id} />
    </div>
  );
};

export default UserProfile;
