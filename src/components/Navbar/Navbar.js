import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import { NavLink, Link } from "react-router-dom";

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

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/">React Auth Hooks Fullstack</Link>
          </Typography>

          <NavLink activeStyle={{ color: "red" }} exact to={"/login"}>
            <Button color="inherit" style={{ color: "white" }}>
              Login
            </Button>
          </NavLink>

          <NavLink activeStyle={{ color: "red" }} exact to={"/sign-up"}>
            <Button color="inherit" style={{ color: "white" }}>
              Sign Up
            </Button>
          </NavLink>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Navbar;
