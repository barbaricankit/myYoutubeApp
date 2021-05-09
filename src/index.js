import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { PlayListProvider } from "./context/video-context";
import PlayListModalProvider from "./context/playlist-context";
import { DataProvider } from "./context/database-context";
import { BrowserRouter as Router } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <DataProvider>
        <PlayListProvider>
          <PlayListModalProvider>
            <App />
          </PlayListModalProvider>
        </PlayListProvider>
      </DataProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);
