// ENTRY POINT — the first JavaScript file the browser runs.
// It finds <div id="root"> in index.html and tells React to draw <App /> inside it.
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode is a dev-only helper that warns you about common mistakes.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
