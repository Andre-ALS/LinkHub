import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../../store/AuthContext";
import { Box } from "@mui/material";
import Navbar from "../../components/Navbar";

interface AuthContainerProps {
  children: React.ReactNode;
}

const AuthContainer: React.FC<AuthContainerProps> = ({ children }) => {
  const authContext = useAuthContext();

  return authContext.user ? (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Navbar />
      {children}
    </Box>
  ) : (
    <Navigate to="/" replace />
  );
};

export default AuthContainer;
