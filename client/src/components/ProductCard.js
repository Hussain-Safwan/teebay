import React, { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import ConfirmModal from "./ConfirmModal";

const ProductCard = ({ product }) => {
  const {
    title,
    description,
    categories,
    creating_date,
    selling_price,
    renting_price,
    renting_price_unit,
  } = product;
  const [openConfirmModal, setOpenConfirmModal] = useState(false);

  const handleDelete = () => {
    console.log("deleted");
  };

  const closeConfirmModal = () => setOpenConfirmModal(false);

  return (
    <div className="product-card">
      <ConfirmModal
        open={openConfirmModal}
        handleAction={handleDelete}
        handleClose={closeConfirmModal}
        title={"Delete Product"}
        message={"Are you sure you want to delete this product?"}
        actionBtnText={"Delete"}
        cancelBtnText={"Cancel"}
      />
      <div className="first-row">
        <div>
          <h3>{title}</h3>
        </div>
        <div onClick={() => setOpenConfirmModal(true)}>
          <DeleteIcon />
        </div>
      </div>
      <div className="categories sub">{`Categories: ${categories
        .split("#")
        .join(", ")}`}</div>
      <div className="price sub">{`Price: ${selling_price} | Rent: $ ${renting_price} per ${renting_price_unit}`}</div>

      <div className="description">{description}</div>

      <div className="footer sub">
        <div className="date">{new Date(creating_date).toString()}</div>
        <div className="views">
          <RemoveRedEyeIcon />
          <span>156</span>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
