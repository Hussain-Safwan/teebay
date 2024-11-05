import React from "react";
import "../styles/products.css";
import { Button } from "@mui/material";

const ProductDetails = () => {
  return (
    <div className="product-card details">
      <div className="first-row">
        <div>
          <h3>ASUS ZenBook</h3>
        </div>
      </div>
      <div className="categories sub">Categories</div>
      <div className="price sub">Price</div>

      <div className="description">
        You can configure the SwipeableDrawer to have a visible edge when
        closed. If you are on a desktop, you can toggle the drawer with the
        "OPEN" button. If you are on mobile, you can open the demo in
        CodeSandbox ("edit" icon) and swipe.
      </div>

      <div className="footer sub">
        <div></div>
        <div className="buttons">
          <Button variant="outlined">Rent</Button>
          <Button variant="outlined">Buy</Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
