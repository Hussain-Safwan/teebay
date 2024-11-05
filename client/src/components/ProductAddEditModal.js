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

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

const MultipleSelectCheckmarks = () => {
  const [personName, setPersonName] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          id="demo-multiple-checkbox"
          multiple
          value={personName}
          onChange={handleChange}
          input={<OutlinedInput label="Tag" />}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
        >
          {names.map((name) => (
            <MenuItem key={name} value={name}>
              <Checkbox checked={personName.includes(name)} />
              <ListItemText primary={name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

const ProductForm = () => {
  return (
    <div className="product-form">
      <div className="form-field">
        <label>Title</label>
        <TextField
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
        <textarea rows={5} placeholder="Enter the description" />
      </div>
      <div className="form-field">
        <label>Price</label>
        <br />
        <div className="price-field">
          <TextField placeholder="Enter the expected price" />
          <TextField placeholder="Enter unit price for renting" />
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
}) {
  return (
    <React.Fragment>
      <form>
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
              <ProductForm />
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleAction}>{actionBtnText}</Button>
            <Button onClick={handleClose} autoFocus>
              {cancelBtnText}
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </React.Fragment>
  );
}
