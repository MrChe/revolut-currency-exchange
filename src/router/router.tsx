import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Exchange } from "../pages/Exchage/Exchage";
import { observer } from "mobx-react-lite";

export const ApplicationRouter = observer(
  function ApplicationRouter(): JSX.Element {
    return (
      <Router>
        <Switch>
          <Route path="/" exact>
            <Dashboard />
          </Route>
          <Route path="/exchange" exact>
            <Exchange />
          </Route>
        </Switch>
      </Router>
    );
  },
);
