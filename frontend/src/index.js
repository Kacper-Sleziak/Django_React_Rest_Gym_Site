import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Main from './main';
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(    
  <Provider store={store}>
    <React.StrictMode>
      <Main />
    </React.StrictMode>
  </Provider>
)


