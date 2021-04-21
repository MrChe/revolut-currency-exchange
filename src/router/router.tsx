import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Dashboard } from "../pages/Dashboard/Dashboard";
import { Exchange } from "../pages/Exchage/Exchage";

export const ApplicationRouter = (): JSX.Element => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/dashboard/:id?" exact>
          <Dashboard />
        </Route>
        <Route path="/exchange/:id?" exact>
          <Exchange />
        </Route>
        <Redirect from={"/"} to={"/dashboard"} />
      </Switch>
    </BrowserRouter>
  );
};
