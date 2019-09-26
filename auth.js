import React from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";

/* This module contains some utility functions to save/store
 *  session information into session storage
 *   Session storge contains the following for logged in users:
 *        auth
 *        username
 *        email
 *        firstName
 *        lastName
 *        createdAt
 *        updatedAt
 *        sessionAge           (number of ms before the session expires)
 *        sessionValidUntil    (date-time of when the session expires)
 *        pendingRequest
 *
 */
const Auth = {
  logIn: user => {
    let sessionValidUntil = Date.now() + user.sessionAge - 1000 * 3; // ~3 seconds roundtrip
    sessionValidUntil = new Date(sessionValidUntil);

    sessionStorage.setItem("auth", "true");
    sessionStorage.setItem("pendingRequest", "false");
    sessionStorage.setItem("username", user.username);
    sessionStorage.setItem("email", user.email);
    sessionStorage.setItem("firstName", user.firstName);
    sessionStorage.setItem("lastName", user.lastName);
    sessionStorage.setItem("createdAt", user.createdAt);
    sessionStorage.setItem("updatedAt", user.updatedAt);
    sessionStorage.setItem("sessionAge", user.sessionAge);
    sessionStorage.setItem("sessionValidUntil", sessionValidUntil);
  },

  logOut: function() {
    sessionStorage.clear();
    sessionStorage.setItem("auth", "false");
    sessionStorage.setItem("sessionValidUntil", new Date() - 1);

    return axios
      .get("http://localhost:8080/auth/logout")
      .then(res => {})
      .catch(err => {});
  },

  getName: () => {
    return (
      sessionStorage.getItem("firstName") +
      " " +
      sessionStorage.getItem("lastName")
    );
  },

  getUsername: () => sessionStorage.getItem("username"),

  isAuthenticated: () => {
    let auth = sessionStorage.getItem("auth") === "true";
    let username = sessionStorage.getItem("username");
    let sessionValidUntil = Date.parse(
      sessionStorage.getItem("sessionValidUntil")
    );
    return auth && username && new Date() < sessionValidUntil;
  },

  // checks if the session is still valid and refreshes its duration
  validateSession: function() {
    sessionStorage.setItem("pendingRequest", "true");
    return axios
      .get("http://localhost:8080/auth/session")
      .then(res => {
        let ret = false;
        if (res.status === 200 && res.data.user) {
          this.logIn(res.data.user);
          ret = true;
        } else {
          this.logOut();
        }
        sessionStorage.setItem("pendingRequest", "false");
        return ret;
      })
      .catch(err => {
        this.logOut();
        sessionStorage.setItem("pendingRequest", "false");
        return false;
      });
  }
};

/*
 * High Order Component (HoC) to redirect unauthorized requests to login page
 */
function withAuth(ComponentToProtect) {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false
      };
    }
    async componentDidMount() {
      if (Auth.isAuthenticated()) {
        this.setState({ loading: false });
      } else {
        let result = await Auth.validateSession();
        if (result) {
          this.setState({ loading: false });
        } else {
          this.setState({ loading: false, redirect: true });
        }
      }
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return (
          <Redirect
            to={{ pathname: "/Login", state: { from: this.props.location } }}
          />
        );
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  };
}
/*
 * High Order Component (HoC) to redirect authorized requests to home page
 */
function withoutAuth(ComponentToProtect) {
  return class extends React.Component {
    constructor() {
      super();
      this.state = {
        loading: true,
        redirect: false
      };
    }
    componentDidMount() {
      if (Auth.isAuthenticated()) {
        this.setState({ loading: false, redirect: true });
      } else {
        this.setState({ loading: false });
      }
    }
    render() {
      const { loading, redirect } = this.state;
      if (loading) {
        return null;
      }
      if (redirect) {
        return (
          <Redirect
            to={{ pathname: "/", state: { from: this.props.location } }}
          />
        );
      }
      return (
        <React.Fragment>
          <ComponentToProtect {...this.props} />
        </React.Fragment>
      );
    }
  };
}

export default Auth;
export { withAuth, withoutAuth };
