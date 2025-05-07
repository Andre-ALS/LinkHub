import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { AuthProvider } from "./store/AuthContext.tsx";
import { LinksProvider } from "./store/LinksContext.tsx";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#735CDD",
    },
    secondary: {
      main: "#FBFAF8",
    },
    text: {
      primary: "#222222",
      secondary: "#444444",
    },
    background: {
      default: "#735CDD",
      paper: "#ffffff",
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <LinksProvider>
        <App />
      </LinksProvider>
    </AuthProvider>
  </ThemeProvider>
);
