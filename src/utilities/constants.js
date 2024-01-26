import { createTheme } from "@mui/material/styles";

export const SERVER_ADDRESS = "http://127.0.0.1:8000";
export const THEME = createTheme({
  components: {
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: "#F6F6F6",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: "1.0625rem",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "24px",
          letterSpacing: "2px",
          fontSize: "0.875rem",
          padding: "20px",
          maxHeight: "50px",
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: "none",
          fontWeight: 600,
          color: "#574514",
        },
      },
    },
  },
  palette: {
    common: {
      black: "#1E0507",
    },
    primary: {
      main: "#600B12",
    },
    secondary: {
      main: "#8A753C",
    },
    error: {
      main: "#B91B28",
    },
    background: {
      paper: "#F6F3EC",
      default: "#ECE9E2",
    },
  },

  typography: {
    fontFamily: "'Open Sans', sans-serif",
    h2: {
      fontFamily: "'Brygada 1918', serif",
      fontSize: "2.5rem",
      lineHeight: 1.2,
      letterSpacing: "8px",
      textTransform: "uppercase",
      fontWeight: 500,
      color: "#8A753C",
    },
    h4: {
      fontFamily: "'Brygada 1918', serif",
      fontSize: "1.375rem",
      lineHeight: 1.35,
      color: "#8A753C",
    },
    h6: {
      fontFamily: "'Brygada 1918', serif",
      fontSize: "0.88rem",
      lineHeight: 1.35,
      color: "#8A753C",
      textTransform: "uppercase",
      fontWeight: 600,
      letterSpacing: "8px",
    },
    body1: {
      fontFamily: "'Open Sans', sans-serif",
      fontSize: "1.0625rem",
      lineHeight: 1.35,
      color: "#1E0507",
    },
    body2: {
      fontFamily: "'Open Sans', sans-serif",
      fontSize: "0.875rem",
      lineHeight: 1.35,
      color: "#1E0507",
      opacity: 0.75,
      fontWeight: 500,
    },
  },
});
