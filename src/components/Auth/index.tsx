import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRoutes: React.FC = () => {
  const localStorageToken = localStorage.getItem("token");

  return localStorageToken ? <Outlet /> : <Navigate to="/" replace />;
};

export default AuthRoutes;
