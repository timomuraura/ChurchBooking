import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./App.css";

import store from "./store";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utilities/setAuthToken";
import { loginUser, logoutUser, setCurrentUser } from "./actions/authActions";

import { ChurchBooking, Login, ResetPassword, AdminLayout } from "./components";

//check for token
if (localStorage.jwtToken) {
  // set auth token header
  setAuthToken(localStorage.jwtToken);
  // decode token and user info
  const decoded = jwt_decode(localStorage.jwtToken);
  // set user and is authenticated
  store.dispatch(setCurrentUser(decoded));
  //check for expired token
  const currentTime = Date.now() / 1000;

  if (decoded.exp < currentTime) {
    //logout user
    store.dispatch(logoutUser());

    //redirect to login page
    window.location.href = "/login";
  }
}

class App extends Component {
  state = {};
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={ChurchBooking} />
          <Route exact path="/ack" component={ChurchBooking} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/reset-password" component={ResetPassword} />
          <Route exact path="/admin" component={AdminLayout} />
        </Switch>
      </Router>
    );
  }
}

export default App;
