import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAuthenticated, getUserRole } from "./auth-service";

const PrivateRoute = ({ children, requiredRole }) => {
  const location = useLocation();

  if (!isAuthenticated()) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  const userRole = getUserRole();
  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default PrivateRoute;
