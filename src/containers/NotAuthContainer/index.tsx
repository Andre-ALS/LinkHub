import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../store/AuthContext";

interface NotAuthContainerProps {
  children: React.ReactNode;
}

const NotAuthContainer: React.FC<NotAuthContainerProps> = ({ children }) => {
  const authContext = useAuthContext();

  return authContext.user ? <Navigate to="/dashboard" replace /> : children;
};

export default NotAuthContainer;
