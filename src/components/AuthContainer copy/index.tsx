import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../store/AuthContext";

interface AuthContainerProps {
  children: React.ReactNode;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {
  const authContext = useAuthContext();

  return authContext.user ? children : <Navigate to="/" replace />;
};

export default AuthContainer;
