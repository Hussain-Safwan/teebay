import * as React from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function CreateAccount() {
  const navigate = useNavigate();

  const [name, setName] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [alert, setAlert] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const onNameChange = (e) => setName(e.target.value);
  const onUsernameChange = (e) => setUsername(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const submit = async () => {};

  return (
    <div className="login">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        message={alert}
      />
      <div className="box">
        <h1>
          Sign up for <span>Teebay</span>
        </h1>
        <div className="login-box">
          <TextField
            id="outlined-basic"
            label="Enter Full Name"
            variant="outlined"
            className="textbox"
            value={name}
            onChange={(e) => onNameChange(e)}
          />
        </div>
        <br />
        <div className="login-box">
          <TextField
            id="outlined-basic"
            label="Enter Username"
            variant="outlined"
            className="textbox"
            value={username}
            onChange={(e) => onUsernameChange(e)}
          />
        </div>
        <br />
        <div className="login-box">
          <TextField
            id="outlined-basic"
            label="Enter Password"
            variant="outlined"
            className="textbox"
            type="password"
            value={password}
            onChange={(e) => onPasswordChange(e)}
          />
        </div>{" "}
        <br />
        <div className="login-footer">
          <Button
            variant="outlined"
            color="success"
            onClick={() => navigate("/login")}
          >
            Go to Login
          </Button>
          <Button
            variant="contained"
            color="success"
            disabled={name === "" || username === "" || password === ""}
            onClick={submit}
          >
            Create Account
          </Button>
        </div>
      </div>
    </div>
  );
}
export default CreateAccount;
