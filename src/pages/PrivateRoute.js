import React from "react";
import { Route, Navigate, useLocation } from "react-router";
import { useAuthContext } from "../hook/index";

const PrivateRoute = (props) => {
  const { token } = useAuthContext();
  const location = useLocation();

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
