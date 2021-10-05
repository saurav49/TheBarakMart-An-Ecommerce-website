import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";

import { DataProvider, AuthProvider, UserProvider } from "./context/index";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <DataProvider>
      <UserProvider>
        <Router>
          <AuthProvider>
            <App />
          </AuthProvider>
        </Router>
      </UserProvider>
    </DataProvider>
  </React.StrictMode>,
  rootElement
);
