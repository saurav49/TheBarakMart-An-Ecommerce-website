// import React from "react";
// import { Outlet, Navigate } from "react-router-dom";
// const PrivateRoute = ({ isLogin, path, ...props }) => {
//   const { token } = useAuthContext();

//   return (
//     <React.Fragment>
//       {token ? (
//         <Route {...props} />
//       ) : (
//         <Navigate state={{ from: path }} replace to="/login" />
//       )}
//     </React.Fragment>
//   );
// };

// export { PrivateRoute };

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuthContext } from "../hook/index";

const PrivateRoute = ({ path }) => {
  let { token } = useAuthContext();
  if (typeof token === undefined) {
    token = localStorage.getItem("token");
  }
  if (token) {
    return <Outlet />;
  }

  return <Navigate state={{ from: path }} replace to="/login" />;
};

export { PrivateRoute };
