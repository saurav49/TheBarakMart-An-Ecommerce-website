import React from "react";
import ReactDOM from "react-dom";
import setupMockServer from "./api/mock.server";

import App from "./App";

import { BrowserRouter as Router } from "react-router-dom";

import { DataProvider } from "./context/useDataContext";
import { AuthProvider } from "./context/useAuthContext";
import { UserProvider } from "./context/useUserContext";

setupMockServer();

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
