import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const Dashboard = lazy(() => import("../pages/Dashboard/Dashboard"));
const Exchange = lazy(() => import("../pages/Exchange/Exchange"));

export const ApplicationRouter = (): JSX.Element => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route path="/dashboard/:id?" exact>
            <Dashboard />
          </Route>
          <Route path="/account/:id" exact>
            <Exchange />
          </Route>
          <Redirect from={"/"} to={"/dashboard"} />
        </Switch>
      </Suspense>
    </Router>
  );
};
