import React from 'react';
import ReactDom from 'react-dom';
import { createMemoryHistory, createBrowserHistory } from 'history';

import App from './App';

// Mount function to start the app
const mount = (el, { onNavigate, onAuthChange, defaultHistory, initialPath }) => {
  const history = defaultHistory || createMemoryHistory({
    initialEntries: [initialPath],
  });
  
  if (onNavigate) history.listen(onNavigate)
  
  ReactDom.render(<App onAuthChange={onAuthChange} history={history} />, el);
  
  return {
    onParentNavigate: ({ pathname: next }) => {
      const { pathname } = history.location;
      if (pathname === next) return;
      
      history.push(next);
    },
  };
};

// In dev and isolation
if (process.env.NODE_ENV === 'development') {
  const root = document.querySelector('#app[data-dev-app=auth]');
  
  if (root) {
    mount(root, { 
      defaultHistory: createBrowserHistory(),
    });
  }
}

// Otherwise in prod export mount function for container
export { mount };