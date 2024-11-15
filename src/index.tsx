import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/index.scss';
import App from './App';


import { enableLogging } from "mobx-logger";
import { BrowserRouter } from 'react-router-dom';

// enableLogging({
//   action: true,
//   reaction: true,
//   transaction: true,
//   compute: true,
// });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    
  </React.StrictMode>
);