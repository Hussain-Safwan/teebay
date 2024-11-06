import * as React from "react";
import "../styles/login.css";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import { gql, useLazyQuery, useMutation } from "@apollo/client";
import client from "../client";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [openSnackbar, setOpenSnackbar] = React.useState(false);

  const onEmailChange = (e) => setEmail(e.target.value);
  const onPasswordChange = (e) => setPassword(e.target.value);

  const LOGIN_QUERY = gql`
    query Login {
      login(email: "${email}", password: "${password}") {
        user_id
        firstname
        lastname
        address
        email
        phonenumber
        password
      }
    }
  `;

  const [login, res] = useLazyQuery(LOGIN_QUERY, {
    onError: (error) => {
      setOpenSnackbar(true);
      console.log(error);
    },
    onCompleted: (data) => {
      client.writeQuery({
        query: gql`
          query User {
            user {
              user_id
              firstname
              lastname
              address
              email
              phonenumber
              password
            }
          }
        `,
        data: { user: data.login },
      });

      navigate("/");
    },
  });

  return (
    <div className="login">
      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message="Invalid email or passowrd"
      />
      <div className="box">
        <h1>
          Welcome to <span>Teebay</span>
        </h1>
        <div className="login-box">
          <TextField
            label="email"
            variant="outlined"
            className="textbox"
            value={email}
            onChange={(e) => onEmailChange(e)}
          />
        </div>
        <br />
        <div className="login-box">
          <TextField
            label="Password"
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
            onClick={() => navigate("/signup")}
          >
            Create Account
          </Button>
          <Button
            variant="contained"
            color="success"
            onClick={() => login()}
            disabled={email === "" || password === ""}
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
export default Login;
