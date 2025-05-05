import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Container, TextField } from "@mui/material";
import { isEmailValid, isPasswordValid } from "../../utils/validation";
import PasswordInput from "../../components/PasswordInput";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);

  const handleRegister = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (isEmailValid(email) || isPasswordValid(password)) {
      setIsFormValid(false);
      return;
    }
    setIsFormValid(true);

    // Implement login logic here (e.g., API call)
    // On success, store the token in local storage and navigate to the dashboard
    // localStorage.setItem("token", "your_token_here");
    // navigate("/dashboard");
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
          id="login-password"
          value={password}
          onChange={setPassword}
          label="Password"
          error={!isFormValid && !!isPasswordValid(password)}
          helperText={isPasswordValid(password)}
        />
        <Button variant="contained" type="submit">
          Login
        </Button>
        <Button
          variant="outlined"
          type="button"
          onClick={() => navigate("/register")}
        >
          Register
        </Button>
      </Box>
    </Container>
  );
}
