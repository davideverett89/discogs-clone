/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import './App.scss';

import {
  BrowserRouter,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import Home from '../components/Views/Home/Home';
import Auth from '../components/Views/Auth/Auth';

const PublicRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === false
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/home', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const PrivateRoute = ({ component: Component, authed, ...rest }) => {
  const routeChecker = (props) => (authed === true
    ? (<Component {...props} />)
    : (<Redirect to={{ pathname: '/auth', state: { from: props.location } }} />));
  return <Route {...rest} render={(props) => routeChecker(props)} />;
};

const App = () => {
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    console.log('Authed:', authed);
    setAuthed(false);
  });

  return (
    <div className='App'>
      <BrowserRouter>
        <>
          <Switch>
            <PrivateRoute path='/home' component={Home} authed={authed} />
            <PublicRoute path='/auth' component={Auth} authed={authed} />
            <Redirect from="*" to="/home"/>
          </Switch>
        </>
      </BrowserRouter>
    </div>
  );
};

export default App;
