import React, {lazy, Suspense, useEffect, useState} from 'react';
import { Router, BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles';
import { createBrowserHistory } from 'history';

import Header from './components/Header';
import Progress from './components/Progress';

const MarketingLazy = lazy(() => import('./components/MarketingApp'));
const AuthLazy = lazy(() => import('./components/AuthApp'));
const DashboardLazy = lazy(() => import('./components/DashboardApp'));

const generateClassName = createGenerateClassName({
  productionPrefix: 'ctr',
});

const history = createBrowserHistory();

export default () => {
  const [ currentUser, setCurrentUser ] = useState(null);
  
  useEffect(() => {
    if (!currentUser) return;
    
    history.push('/dashboard');
  }, [currentUser]);
  
  return (
    <StylesProvider generateClassName={generateClassName}>
      <Router history={history}>
        <div>
          <Header user={currentUser} onSignOut={() => setCurrentUser(null)} />
          <Suspense fallback={<Progress />}>
            <Switch>
              <Route path="/auth">
                <AuthLazy onSignIn={(user) => setCurrentUser(user)} />
              </Route>
              <Route path="/dashboard">
                {!currentUser && <Redirect to="/" />}
                <DashboardLazy />
              </Route>
              <Route path="/" component={MarketingLazy} />
            </Switch>
          </Suspense>
        </div>
      </Router>
    </StylesProvider>
  );
};