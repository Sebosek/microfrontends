import { createApp } from 'vue';
import Dashboard from './components/Dashboard.vue';

// Mount function to start the app
const mount = (el) => {
  const app = createApp(Dashboard);
  
  app.mount(el);
};

// In dev and isolation
if (process.env.NODE_ENV === 'development') {
  const root = document.querySelector('#app[data-dev-app=dashboard]');
  
  if (root) {
    mount(root);
  }
}

// Otherwise in prod export mount function for container
export { mount };