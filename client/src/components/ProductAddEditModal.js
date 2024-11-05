import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { TextField } from "@mui/material";

import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import "../styles/modals.css";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = [
  "Electronics",
  "Furniture",
  "Home Appliances",
  "Sporting Goods",
  "Outdoor",
];

const MultipleSelectCheckmarks = () => {
  const [selectedCategories, setSelectedCategories] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedCategories(typeof value === "string" ? value.split(",") : value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={selectedCategories}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {categories.map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={selectedCategories.includes(item)} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

const ProductForm = ({ values, setValues }) => {
  const { title, description, price, rentingPrice, rentingPriceUnit } = values;
  return (
    <div className="product-form">
      <div className="form-field">
        <label>Title</label>
        <TextField
          value={title}
          name="title"
          onChange={(e) => setValues(e.target.name, e.target.value)}
          placeholder="Enter title of the product"
          sx={{ width: "100%" }}
        />
      </div>
      <div className="form-field">
        <label>Category</label>
        <MultipleSelectCheckmarks />
      </div>
      <div className="form-field">
        <label>Description</label>
        <br />
        <textarea
          value={description}
          name="description"
          rows={5}
          placeholder="Enter the description"
          onChange={(e) => setValues(e.target.name, e.target.value)}
        />
      </div>
      <div className="form-field">
        <label>Price</label>
        <br />
        <div className="price-field">
          <TextField
            value={price}
            name="price"
            placeholder="Enter the expected price"
            onChange={(e) => setValues(e.target.name, e.target.value)}
          />
          <TextField
            value={rentingPrice}
            name="rentingPrice"
            placeholder="Enter unit price for renting"
            onChange={(e) => setValues(e.target.name, e.target.value)}
          />
          <select>
            <option>Day</option>
            <option>Month</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default function ProductAddEditModal({
  open,
  handleAction,
  handleClose,
  title,
  message,
  actionBtnText,
  cancelBtnText,
  edit,
  previousState,
}) {
  const [values, setValues] = React.useState({
    title: edit ? previousState.title : "",
    description: edit ? previousState.description : "",
    price: edit ? previousState.price : 0,
    rentingPrice: edit ? previousState.rentingPrice : 0,
    rentingPriceUnit: edit ? previousState.rentingPriceUnit : "",
  });

  const handleChanges = (name, value) => {
    setValues((values) => ({ ...values, [name]: value }));
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        PaperProps={{
          sx: {
            width: "200%",
            maxWidth: "720px!important",
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <ProductForm values={values} setValues={handleChanges} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAction}>{actionBtnText}</Button>
          <Button onClick={handleClose} autoFocus>
            {cancelBtnText}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
