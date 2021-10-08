import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";

import { DataProvider, AuthProvider, UserProvider } from "./context/index";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <Router>
      <DataProvider>
        <UserProvider>
          <AuthProvider>
            <App />
          </AuthProvider>
        </UserProvider>
      </DataProvider>
    </Router>
  </React.StrictMode>,
  rootElement
);
