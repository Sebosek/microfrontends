import React from 'react';
import { Switch, Route, Router } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';

import SignIn from './components/Signin';
import SignUp from './components/Signup';

const generateClassName = createGenerateClassName({
  productionPrefix: 'auth',
});

export default ({ history, onAuthChange }) => {
  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <Switch>
          <Route path="/auth/signin">
            <SignIn onSignIn={onAuthChange} />
          </Route>
          <Route path="/auth/signup">
            <SignUp onSignIn={onAuthChange} />
          </Route>
        </Switch>
      </Router>
    </StylesProvider>
  );
};