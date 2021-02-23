import React from 'react';
import ReactDom from 'react-dom';

import App from './App';

// Mount function to start the app
const mount = (el) => {
  ReactDom.render(<App />, el);
};

// In dev and isolation
if (process.env.NODE_ENV === 'development') {
  const root = document.querySelector('#app[data-dev-app=marketing]');
  
  if (root) {
    mount(root);
  }
}

// Otherwise in prod export mount function for container
export { mount };