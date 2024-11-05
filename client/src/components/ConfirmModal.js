import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const RentalPeriod = () => {};

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
            {rental ? <></> : { message }}
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
