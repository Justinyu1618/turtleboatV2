import React, { Fragment } from "react";
import "./App.scss";
import { CookiesProvider } from "react-cookie";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import AppHeader from "./AppHeader";
import LandingPage from "./components/LandingPage";
import LoginCallback from "./components/LoginCallback";

import Alert from "react-s-alert";

import "react-s-alert/dist/s-alert-default.css";
import "react-s-alert/dist/s-alert-css-effects/slide.css";
import DashboardView from "./views/DashboardView";
import ProjectView from "./views/ProjectView";
import ModuleBuilderView from "./views/ModuleBuilderView";
import CurriculumView from "./views/CurriculumView";
import StudentModuleView from "./views/StudentModuleView";

const App: React.FC = () => {
  document.title = process.env.REACT_APP_NAME || "";
  return (
    <Fragment>
      <Router>
        <CookiesProvider>
          <div className="App">
            <AppHeader />
            <Switch>
              <Route exact path="/login/auth" component={LoginCallback} />
              <Route exact path="/" component={ProjectView} />
              <Route path="/dashboard" component={DashboardView} />
              <Route path="/projects" component={ProjectView} />
              <Route path="/curriculum" component={CurriculumView} />
              <Route path="/module/:id" component={StudentModuleView} />
            </Switch>
          </div>
        </CookiesProvider>
      </Router>
      <Alert stack={{ limit: 3 }} />
    </Fragment>
  );
};

export default App;
