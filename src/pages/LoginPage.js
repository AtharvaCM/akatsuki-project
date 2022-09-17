import React, { useEffect, useState } from "react";

//Custom UI
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";

// redux
import { useDispatch, useSelector } from "react-redux";

// react router
import { useNavigate } from "react-router-dom";

// custom hooks
import { useAxios } from "../hooks/useAxios";

// path constants
import { ROUTES } from "../utils/constants/routingPathConstants";

// actions
import { setLogin } from "../store/loginSlice";

const LoginPage = () => {
  document.body.style.overflow = "auto";

  const { loaded, error, data, callAPI, setLoaded } = useAxios();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginURL = `${process.env.REACT_APP_FLASK_DOMAIN}/api/v1/auth/login`;
  // const loginURL = "http://127.0.0.1:5000/api/v1/auth/login";

  // selector
  const { isAuthenticated } = useSelector((state) => state.login);

  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    // show spinner on button
    setLoading(true);

    // call Login API
    const payload = JSON.stringify({
      username: username,
      password: password,
    });
    setLoaded(false);
    callAPI(loginURL, "POST", payload);
  };

  // if user is already logged in, redirect to home
  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.HOME);
    }

    if (error) {
      setLoading(false);
      console.log("error: ", error);
    }
  }, [error]);

  useEffect(() => {
    if (loaded) {
      console.log("data: ", data);
      setLoading(false);

      //  if login is successful
      if (data && data.is_authenticated) {
        // save in state
        dispatch(
          setLogin({
            isAuthenticated: data.is_authenticated,
            username: data.username,
            userId: data.user_id,
            token: data.token,
            avatar: data.avatar,
          })
        );

        // set isAuthenticated and token to localstorage
        localStorage.setItem("isAuthenticated", data.is_authenticated);
        localStorage.setItem("token", data.token);
        localStorage.setItem("avatar", data.avatar);
        localStorage.setItem("userId", data.user_id);
        localStorage.setItem("username", data.username);

        // redirect to home page
        navigate(ROUTES.HOME);
      }

      if (data && data.message === "Does not exists.") {
        setLoading(false);
      }

      // check for errors and display feedback
      setShow(true);
    }
  }, [loaded]);

  return (
    <div>
      <Card sx={styles.mainBox}>
        <Typography variant="h4" sx={styles.heading} textAlign="center">
          Sign in
        </Typography>
        <hr></hr>

        <div style={styles.innerBox}>
          {/* Alert */}
          {show && (
            <Alert
              variant="outlined"
              severity="error"
              onClose={() => setShow(false)}
              sx={{ marginY: "2em" }}
            >
              Wrong credentials!
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              id="username-outlined"
              label="Username"
              type="text"
              size="small"
              variant="outlined"
              fullWidth
              style={styles.inputtext}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <TextField
              id="password-outlined"
              label="Password"
              type="password"
              size="small"
              variant="outlined"
              fullWidth
              style={styles.inputtext}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {/* Login Button */}
            <LoadingButton
              size="medium"
              loading={loading}
              loadingPosition="center"
              variant="contained"
              style={styles.loginButton}
              type="submit"
            >
              Login
            </LoadingButton>
          </form>
        </div>
      </Card>
    </div>
  );
};

const styles = {
  mainBox: {
    margin: "7% 35%",
    padding: "32px",
  },
  heading: {
    fontWeight: 500,
  },
  innerBox: {
    margin: "10%",
  },
  inputtext: {
    marginBottom: "25px",
  },
  loginButton: {
    margin: "0% 34%",
  },
};
export default LoginPage;
