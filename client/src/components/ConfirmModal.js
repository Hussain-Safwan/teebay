import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const RentalPeriod = ({ setHeight }) => {
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
        onFocus={() => setHeight((item) => "400px")}
        onBlur={() => setHeight("auto")}
      />
      <label>To</label>
      <DatePicker
        selected={dates.end}
        onChange={(date) => setDates((prev) => ({ ...prev, ["end"]: date }))}
        onFocus={() => setHeight((item) => "400px")}
        onBlur={() => setHeight("auto")}
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
  const [height, setHeight] = React.useState("auto");
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
            height: height,
          },
        }}
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {rental ? <RentalPeriod setHeight={setHeight} /> : { message }}
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
