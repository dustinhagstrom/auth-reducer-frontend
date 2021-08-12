import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";

import Spinner from "./components/Spinner/Spinner";
import MainRouter from "./MainRouter";
import React from "react";

import AuthContextWrapper, { AuthContext } from "./context/AuthContext";

function App() {
  return (
    // the react.suspense or maybe the react.lazy on mainrouter makes it to where to only data pulled when a url is hit
    // is the data that is associated with that URL and not all the data
    //the fallback will be pulled and used until the actual page associated with the URL is mounted.
    <React.Suspense fallback={<Spinner />}>
      <Router>
        <AuthContextWrapper>
          <MainRouter />
        </AuthContextWrapper>
      </Router>
    </React.Suspense>
  );
}

export default App;
