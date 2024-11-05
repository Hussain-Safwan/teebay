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
            type="number"
            value={price}
            name="price"
            placeholder="Enter the expected price"
            onChange={(e) => setValues(e.target.name, e.target.value)}
          />
          <TextField
            type="number"
            value={rentingPrice}
            name="rentingPrice"
            placeholder="Enter unit price for renting"
            onChange={(e) => setValues(e.target.name, e.target.value)}
          />
          <select
            value={rentingPriceUnit}
            name="rentingPriceUnit"
            onChange={(e) => setValues(e.target.name, e.target.value)}
          >
            <option>Day</option>
            <option>Month</option>
          </select>
        </div>
      </div>
    </div>
  );
};

const Summary = ({ values }) => {
  const { title, description, price, rentingPrice, rentingPriceUnit } = values;

  return (
    <div>
      <div>
        <h2>Summary</h2>
      </div>
      <div className="summary-contents">
        <span className="summary-item">Title: {title}</span>
        <br />
        <span className="summary-item">Categories:</span>
        <br />
        <span className="summary-item">Description: {description}</span>
        <br />
        <span className="summary-item">
          Price: {price}, To rent {rentingPrice} per {rentingPriceUnit}
        </span>
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

  const [showSummary, setShowSummary] = React.useState(false);

  const handleChanges = (name, value) => {
    setValues((values) => ({ ...values, [name]: value }));
  };

  const submit = () => {
    console.log(values);
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
            {showSummary ? (
              <Summary values={values} />
            ) : (
              <ProductForm values={values} setValues={handleChanges} />
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {showSummary ? (
            <Button onClick={submit}>{actionBtnText}</Button>
          ) : (
            <Button onClick={() => setShowSummary(true)}>Next</Button>
          )}
          {showSummary ? (
            <Button onClick={() => setShowSummary(false)} autoFocus>
              Go Back
            </Button>
          ) : (
            <Button onClick={handleClose}>{cancelBtnText}</Button>
          )}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
