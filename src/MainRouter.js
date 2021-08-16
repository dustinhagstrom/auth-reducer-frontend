import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
// import Auth from "./components/Auth/Auth";
// import Home from "./components/Home/Home";
// import NotFound from "./components/NotFound/NotFound";

const Home = React.lazy(() => import("./components/Home/Home"));
const Auth = React.lazy(() => import("./components/Auth/Auth"));
const NotFound = React.lazy(() => import("./components/NotFound/NotFound"));
const Protected = React.lazy(() => import("./components/Protected/Protected"));
const Profile = React.lazy(() => import("./components/Protected/Protected"));

function MainRouter() {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/sign-up" component={Auth} />
        <Route exact path="/login" component={Auth} />

        <Route exact path="/logout" render={() => <Redirect to="/login" />} />
        {/* the <Switch> lets up make the following Route to handle URL's that do not exist in our app. */}
        <Route exact path="/" component={Home} />
        <PrivateRoute exact path="/protected" component={Protected} />
        <PrivateRoute exact path="/profile" component={Profile} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

export default MainRouter;
