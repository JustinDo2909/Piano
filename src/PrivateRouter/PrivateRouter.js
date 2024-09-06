import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRouter = ({ element: Component, ...rest }) => {
  const user = useSelector((state) => state.authUser.authUser);

  if (!user.token) {
    return <Navigate to="/login" replace />;
  }
  // if(requiredRole && !user.role.includes(requiredRole)){
  //   return <Navigate to="/404" replace />
  // }
  return <Component {...rest} />;
};

export default PrivateRouter;
