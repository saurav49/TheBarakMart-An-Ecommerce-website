import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuthContext } from "../hook/index";
const PrivateRoute = ({ isLogin, path, ...props }) => {
  const { token } = useAuthContext();

  console.log("PrivateRoute", token);

  return (
    <React.Fragment>
      {token ? (
        <Route {...props} />
      ) : (
        <Navigate state={{ from: path }} replace to="/login" />
      )}
    </React.Fragment>
  );
};

export { PrivateRoute };
