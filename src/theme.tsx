import { createTheme } from "@mui/material/styles";

// A custom theme for this app
const theme = createTheme({
  cssVariables: true,
  palette: {
    primary: {
      main: "#4E87F8",
      contrastText: "#FFFFFF",
    },
  },
  custom: {
    neutral: {
      200: "#D9D9D9",
      300: "#9A9A9A",
      400: "#7d7d7d",
      500: "#5B5B5B",
      800: "#272727",
    },
    red: {
      500: "#F24E1E",
    },
    blue: {
      500: "#4E87F8",
      600: "#3F51B5",
    },
  },
  typography: {
    fontFamily: ["Nunito sans", "Arial", "sans-serif"].join(","),
    button: {
      textTransform: "none",
    },
  },
  components: {
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.0)",
        },
      },
    },
  },
});

// to be able to config the create theme with my colors
declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      neutral: {
        200: string;
        300: string;
        400: string;
        500: string;
        800: string;
      };
      red: {
        500: string;
      };
      blue: {
        500: string;
        600: string;
      };
    };
  }

  // Allow configuration using `createTheme`
  interface ThemeOptions {
    custom?: {
      neutral?: {
        200?: string;
        300?: string;
        400?: string;
        500?: string;
        800?: string;
      };
      red?: {
        500?: string;
      };
      blue?: {
        500?: string;
        600?: string;
      };
    };
  }
}

export default theme;
