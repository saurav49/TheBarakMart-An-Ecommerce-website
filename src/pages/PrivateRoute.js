import React from "react";
import { Route, Navigate } from "react-router-dom";
// import {useAuthContext} from "../context/useAuthContext";

const PrivateRoute = ({ isLogin, path, ...props }) => {
  // const {isLogin} = useAuthContext();

  console.log("PrivateRoute", isLogin, path, props);

  return (
    <>
      {isLogin ? (
        <Route path={path} {...props} />
      ) : (
        <Navigate state={{ from: path }} replace to="/login" />
      )}
    </>
  );
};

export { PrivateRoute };
