import React from 'react';
import { Router as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import { Session } from 'meteor/session';
import createHistory from "history/createBrowserHistory"

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';

export const history = createHistory();

PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={ props => !!Meteor.userId() ? <Component {...props} /> : <Redirect to="/" />} />
);

PublicRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={ props => !Meteor.userId() ? <Component {...props} /> : <Redirect to="/dashboard" />} />
);


export default <Router history={history}>
    <Switch>
      <PublicRoute exact path="/" component={Login} />
      <PublicRoute exact path="/signup" component={Signup} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
      <PrivateRoute path="/dashboard/:id" component={Dashboard} />
      <Route component={NotFound}/>
    </Switch>
  </Router>;
