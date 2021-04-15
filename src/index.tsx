import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoginView from "./views/LoginView";
import DashboardView from "./views/DashboardView";
//@ts-ignore
import { LinkedInPopUp } from "react-linkedin-login-oauth2";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginView} />
        <Route exact path="/linkedin" component={LinkedInPopUp} />
        <Route path="/dashboard" component={DashboardView} />
      </Switch>
    </Router>
  );
};
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
