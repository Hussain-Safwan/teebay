import React, { useState } from "react";
import "../styles/products.css";
import { Button } from "@mui/material";
import ConfirmModal from "./ConfirmModal";

const ProductDetails = () => {
  const [openBuyModal, setOpenBuyModal] = useState(false);
  const [openRentModal, setOpenRentModal] = useState(false);
  const [rentalPeriod, setRentalPreiod] = useState();

  const handleBuyModalClose = () => setOpenBuyModal(false);
  const submiBuyRequest = () => {};

  const handleRentModalClose = () => setOpenRentModal(false);
  const submitRentingRequest = () => {};

  return (
    <div className="product-card details">
      <ConfirmModal
        open={openRentModal}
        title={"Rental Period"}
        handleAction={submitRentingRequest}
        handleClose={handleRentModalClose}
        actionBtnText={"Confirm rent"}
        cancelBtnText={"Go back"}
        rental={true}
      />

      <ConfirmModal
        open={openBuyModal}
        title={"Confirm purchase"}
        message={"Are you sure you want to buy this product"}
        handleAction={submiBuyRequest}
        handleClose={handleBuyModalClose}
        actionBtnText={"Yes"}
        cancelBtnText={"No"}
        rental={false}
      />

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
          <Button variant="outlined" onClick={() => setOpenRentModal(true)}>
            Rent
          </Button>
          <Button variant="outlined" onClick={() => setOpenBuyModal(true)}>
            Buy
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
