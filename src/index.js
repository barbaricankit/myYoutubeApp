import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { PlayListProvider } from './video-context';
import { DataProvider } from './database-context';
import {BrowserRouter as Router} from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <Router >
   <DataProvider>
      <PlayListProvider>
        <App />
      </PlayListProvider>
    </DataProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
