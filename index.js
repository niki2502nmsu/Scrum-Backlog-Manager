import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faSpider,
  faHome,
  faTachometerAlt,
  faBook,
  faUsersCog,
  faUserFriends,
  faPowerOff,
  faArchive
} from "@fortawesome/free-solid-svg-icons";
// import { faCheckSquare, faCoffee } from "@fortawesome/free-solid-svg-icons";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import { Routes } from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

// Fontaweomse Library
library.add(
  faSpider,
  faHome,
  faTachometerAlt,
  faBook,
  faUsersCog,
  faPowerOff,
  faUserFriends,
  faArchive
);

ReactDOM.render(
  <Router>
    <Routes />
  </Router>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
