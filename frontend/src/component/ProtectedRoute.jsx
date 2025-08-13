import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function isAuthenticated() {
  return Boolean(localStorage.getItem("token"));
}

export default function ProtectedRoute() {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}


