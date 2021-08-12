import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { NavLink, Link } from "react-router-dom";

import { AuthContext } from "../../context/AuthContext";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Navbar() {
  const classes = useStyles();

  const {
    state: { user },
  } = useContext(AuthContext);

  const isUserLoggedIn = user ? true : false;

  const navLinkTitleOne = isUserLoggedIn ? "/profile" : "/login";

  const navLinkDisplayOne = isUserLoggedIn ? `${user.email}` : "login";

  const navLinkTitleTwo = isUserLoggedIn ? "/logout" : "/sign-up";

  const navLinkDisplayTwo = isUserLoggedIn ? "Logout" : "Sign up";

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">React Auth Hooks Fullstack</Link>
          </Typography>

          <NavLink activeStyle={{ color: "red" }} exact to={navLinkTitleOne}>
            <Button color="inherit" style={{ color: "white" }}>
              {navLinkDisplayOne}
            </Button>
          </NavLink>

          <NavLink activeStyle={{ color: "red" }} exact to={navLinkTitleTwo}>
            <Button color="inherit" style={{ color: "white" }}>
              {navLinkDisplayTwo}
            </Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
