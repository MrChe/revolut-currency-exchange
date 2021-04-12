import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Account } from '../pages/Account/Account';
import { Exchange } from '../pages/Exchage/Exchage';

export const ApplicationRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Account />
        </Route>
        <Route path="/exchange" exact>
          <Exchange />
        </Route>
      </Switch>
    </Router>
  );
};
