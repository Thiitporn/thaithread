// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

// ProtectedRoute component that checks user roles
const ProtectedRoute = ({ children, allowedRoles }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const role = user.role;
  console.log("User Role from ProtectedRoute:", role); // Log the role for debugging
  // If the user is not authenticated or doesn't have the required role, redirect
  if (!user || !allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  // If user has the required role, allow access to the route
  return children;
};
ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
