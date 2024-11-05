import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RentalPeriod = () => {
  const [dates, setDates] = React.useState({
    start: new Date(),
    end: new Date(),
  });

  return (
    <div className="rental">
      <label>From</label>
      <DatePicker
        selected={dates.start}
        onChange={(date) => setDates((prev) => ({ ...prev, ["start"]: date }))}
      />
      <label>To</label>
      <DatePicker
        selected={dates.end}
        onChange={(date) => setDates((prev) => ({ ...prev, ["end"]: date }))}
      />
    </div>
  );
};

export default function ConfirmModal({
  open,
  handleAction,
  handleClose,
  title,
  message,
  actionBtnText,
  cancelBtnText,
  rental,
}) {
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
            {rental ? <RentalPeriod /> : { message }}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} autoFocus>
            {cancelBtnText}
          </Button>
          <Button onClick={handleAction}>{actionBtnText}</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
