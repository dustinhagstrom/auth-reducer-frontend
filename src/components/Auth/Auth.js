import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import {
  Grid,
  Button,
  TextField,
  CircularProgress,
  Snackbar,
} from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import useChangeInputConfig from "../hooks/useInput";
import useFetchAPI from "../hooks/useFetchAPI";
import checkAuthCookie from "../hooks/checkAuthCookie";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

function Auth(props) {
  const classes = useStyles();
  // console.log(props);
  // console.log(props.match);
  let isLoginRoute = props.match.path === "/login";
  let buttonTitle = isLoginRoute ? "Login" : "Sign up";
  let apiURL = isLoginRoute ? "/users/login" : "/users/create-user"; //this will pass to axios call on useFetchAPi.js

  const { checkIfCookieExists } = checkAuthCookie();

  const [
    { isLoading, response, error, setError, setResponse },
    handleAPICallButtonSubmit,
    isMessageOpen,
    handleMessageOpen,
    handleMessageClose,
    successMessageValue,
  ] = useFetchAPI(apiURL);

  const [
    email,
    handleEmailChange,
    isEmailError,
    emailErrorMessage,
    isEmailDisabled,
    clearEmailInput,
  ] = useChangeInputConfig("email");

  const [
    username,
    handleUsernameChange,
    isUsernameError,
    usernameErrorMessage,
    isUsernameDisabled,
    clearUsernameInput,
  ] = useChangeInputConfig("username");

  const [
    password,
    handlePasswordChange,
    isPasswordError,
    passwordErrorMessage,
    isPasswordDisabled,
    clearPasswordInput,
  ] = useChangeInputConfig("password");

  function handleOnSubmit(e) {
    e.preventDefault();

    const user = isLoginRoute
      ? { email, password }
      : { email, username, password };

    handleAPICallButtonSubmit({
      method: "post",
      data: {
        ...user,
      },
    });
  }

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }

  function errorMessage() {
    return (
      <Snackbar
        open={isMessageOpen}
        autoHideDuration={6000}
        onClose={handleMessageClose}
      >
        <Alert severity="error">{error}</Alert>
      </Snackbar>
    );
  }

  //snackbar is a pop up type of message from material ui.
  //this cause a success variation to pop up with a message from
  //response obj from server.
  function successMessage() {
    return (
      <Snackbar
        open={isMessageOpen}
        autoHideDuration={6000}
        onClose={handleMessageClose}
      >
        <Alert severity="success">{successMessageValue}</Alert>
      </Snackbar>
    );
  }

  if (isLoading) {
    return (
      <div style={{ textAlign: "center" }}>
        <CircularProgress />
      </div>
    );
  }
  if (response === "user created") {
    clearEmailInput();
    clearUsernameInput();
    clearPasswordInput();
    setResponse(null);
  }

  if (checkIfCookieExists()) {
    props.history.push("/protected");
  }

  return (
    <Grid container spacing={0} justifyContent="center">
      {/* if there is a successmessagevalue then run func */}
      {successMessageValue && successMessage()}
      {error && errorMessage()}
      <form className={classes.root} onSubmit={handleOnSubmit}>
        <Grid item m={6}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            value={email}
            onChange={handleEmailChange}
            error={isEmailError}
            helperText={emailErrorMessage}
          />
        </Grid>

        {!isLoginRoute && (
          <Grid item m={6}>
            <TextField
              fullWidth
              label="Username"
              name="username"
              value={username}
              onChange={handleUsernameChange}
              error={isUsernameError}
              helperText={usernameErrorMessage}
            />
          </Grid>
        )}

        <Grid item m={6}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            value={password}
            onChange={handlePasswordChange}
            error={isPasswordError}
            helperText={passwordErrorMessage}
          />
        </Grid>

        <Grid style={{ textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            style={{ marginTop: 10 }}
            disabled={
              isLoginRoute
                ? isEmailDisabled || isPasswordDisabled
                : isEmailDisabled || isPasswordDisabled || isUsernameDisabled
            }
          >
            {buttonTitle}
          </Button>
        </Grid>
      </form>
    </Grid>
  );
}

export default Auth;
