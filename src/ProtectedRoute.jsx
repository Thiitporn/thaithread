// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

// ProtectedRoute component that checks user roles
const ProtectedRoute = ({ children, allowedRoles }) => {
  // ดึงข้อมูลแยกส่วนจาก localStorage
  const userName = localStorage.getItem("userName");
  const userRole = localStorage.getItem("userRole");

  // เพิ่ม console.log เพื่อตรวจสอบค่า
  console.log("userName:", userName);
  console.log("userRole:", userRole);
  console.log("allowedRoles:", allowedRoles);

  // ตรวจสอบการเข้าถึง
  if (!userName || !userRole || !allowedRoles.includes(userRole)) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ProtectedRoute;
