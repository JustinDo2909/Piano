import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const auth = localStorage.getItem("token");

  if (auth === null) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
