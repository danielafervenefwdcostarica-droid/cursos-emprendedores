import React from 'react';
import App from './App.jsx';
import ReactDOM from 'react-dom/client';
import Routing from './routes/Routing.jsx';
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Routing/>
  </React.StrictMode>,
);
