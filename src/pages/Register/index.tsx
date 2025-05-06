import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField } from "@mui/material";
import {
  isConfirmPasswordValid,
  isEmailValid,
  isPasswordValid,
} from "../../utils/validation";
import PasswordInput from "../../components/PasswordInput";
import { useAuth } from "../../store/Auth";

export default function Register() {
  const navigate = useNavigate();

  const authContext = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);

  const handleRegister = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (
      isEmailValid(email) ||
      isPasswordValid(password) ||
      isConfirmPasswordValid(password, confirmPassword)
    ) {
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);

    authContext
      .register(email, password, confirmPassword)
      .then(() => {
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Registration failed:", error.message);
        setIsFormValid(false);
      });
  };

  return (
    <Container
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        component="form"
        onSubmit={(e) => handleRegister(e)}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          border: 1,
          borderRadius: 2,
          padding: 4,
          width: 300,
        }}
      >
        <TextField
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email"
          type="email"
          error={!isFormValid && !!isEmailValid(email)}
          helperText={!isFormValid && isEmailValid(email)}
        />
        <PasswordInput
          required
          id="register-password"
          value={password}
          onChange={setPassword}
          label="Password"
          error={!isFormValid && !!isPasswordValid(password)}
          helperText={isPasswordValid(password)}
        />
        <PasswordInput
          required
          id="register-confirm-password"
          value={confirmPassword}
          onChange={setConfirmPassword}
          label="Confirm Password"
          error={
            !isFormValid && !!isConfirmPasswordValid(password, confirmPassword)
          }
          helperText={isConfirmPasswordValid(password, confirmPassword)}
        />
        <Button variant="contained" type="submit">
          Register
        </Button>
        <Button variant="outlined" type="button" onClick={() => navigate("/")}>
          Login
        </Button>
      </Box>
    </Container>
  );
}
