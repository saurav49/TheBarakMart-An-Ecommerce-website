import React from "react";
import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ isLogin, path, ...props }) => {
  return (
    <React.Fragment>
      {token ? (
        <Route {...props} />
      ) : (
        <Navigate state={{ from: location.pathname }} replace to="/login" />
      )}
    </React.Fragment>
  );
};

export { PrivateRoute };
