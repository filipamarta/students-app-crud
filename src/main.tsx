import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import theme from "./theme.tsx";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { StudentsContextProvider } from "./contexts/StudentsContextProvider.tsx";
import "./index.css";
import { StudentClassContextProvider } from "./contexts/StudentClassContextProvider.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <StudentClassContextProvider>
        <StudentsContextProvider>
          <App />
        </StudentsContextProvider>
      </StudentClassContextProvider>
    </ThemeProvider>
  </StrictMode>
);
