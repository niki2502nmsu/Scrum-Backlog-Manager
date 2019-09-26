import React from "react";
import { default as Home } from "./views/Home";
import { default as Login } from "./views/Login";
import { default as Register } from "./views/Register";
import { Route, Switch, Redirect } from "react-router-dom";
import { withAuth, withoutAuth } from "./auth";
import axios from "axios";

axios.defaults.withCredentials = true;

export const Routes = () => {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/Home" />
      </Route>
      <Route path="/Home" component={withAuth(Home)} />
      <Route exact path="/Login" component={withoutAuth(Login)} />
      <Route exact path="/Register" component={withoutAuth(Register)} />
    </Switch>
  );
};
