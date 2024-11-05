import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmModal from "./ConfirmModal";

const ProductCard = () => {
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleDelete = () => {};

  const closeConfirmModal = () => setOpenConfirmModal(false);

  return (
    <div className="product-card">
      <ConfirmModal
        open={openConfirmModal}
        handleClickOpen={handleDelete}
        handleClose={closeConfirmModal}
      />
      <div className="first-row">
        <div>
          <h3>ASUS ZenBook</h3>
        </div>
        <div onClick={() => setOpenConfirmModal(true)}>
          <DeleteIcon />
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
        <div className="date">Nov 04, 2024</div>
        <div className="views">156</div>
      </div>
    </div>
  );
};

export default ProductCard;
