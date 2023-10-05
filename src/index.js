import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";

import { DataProvider, AuthProvider, UserProvider } from "./context/index";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <AuthProvider>
        <DataProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </DataProvider>
      </AuthProvider>
    </Router>
  </React.StrictMode>,
  rootElement
);
