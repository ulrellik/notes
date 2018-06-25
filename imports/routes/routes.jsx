import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import createHistory from "history/createBrowserHistory"

import Login from '../ui/Login';
import Signup from '../ui/Signup';
import Dashboard from '../ui/Dashboard';
import NotFound from '../ui/NotFound';
import Tests from '../ui/Tests';

const authPaths = ['/dashboard'];
const unauthPaths = ['/', '/signup'];
const history = createHistory();

export function onAuthChange() {
  const isAuth = !!Meteor.userId();
  if (isAuth && unauthPaths.includes(history.location.pathname)) {
    history.replace('/dashboard');
  } else if (!isAuth && authPaths.includes(history.location.pathname)) {
    history.replace('/');
  }
}

export default <Router>
    <Switch>
      <Route exact path="/" render={() => !Meteor.userId() ? <Login/> : <Redirect to="/dashboard"/>}/>
      <Route exact path="/signup" render={() => !Meteor.userId() ? <Signup/> : <Redirect to="/dashboard"/>}/>
      <Route exact path="/dashboard" render={() => !!Meteor.userId() ? <Dashboard/> : <Redirect to="/"/>}/>
      <Route exact path="/tests" render={() => !!Meteor.userId() ? <Tests/> : <Redirect to="/"/>}/>
      <Route component={NotFound}/>
    </Switch>
  </Router>;
