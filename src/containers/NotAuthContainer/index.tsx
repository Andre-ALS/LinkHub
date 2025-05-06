import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../store/Auth";

interface NotAuthContainerProps {
  children: React.ReactNode;
}

const NotAuthContainer: React.FC<NotAuthContainerProps> = ({ children }) => {
  const authContext = useAuth();

  return authContext.user ? <Navigate to="/dashboard" replace /> : children;
};

export default NotAuthContainer;
