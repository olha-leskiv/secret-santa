import { useState } from "react";
import RegistrationPage from "./RegistrationPage";
import VerifyCodePage from "./VerifyCodePage";
import Logo from "../components/Logo";
import bgimage from "../assets/authbg.png";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Stack,
  Container,
} from "@mui/material";
import CreatePasswordPage from "./CreatePaswordPage";
import CreateUsernamePage from "./CreateUsernamePage";
import { Navigate, useLocation, Outlet } from "react-router-dom";

function AuthentificationPage() {
  return (
    <Box
      sx={{
        background: `url(${bgimage})`,
        backgroundSize: "cover",
        p: 2,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          backgroundColor: "background.default",
          position: "relative",
          pt: 5,
          px: 4,
          pb: 7.5,
          display: "flex",
          justifyContent: "space-between",
          maxWidth: "md",
          flexGrow: 1,
          flexDirection: "column",
          borderRadius: 4,
        }}
      >
        <Logo />
        {/* {componentToRender} */}
        <Outlet />
        <Box />
      </Box>
    </Box>
  );
}

export default AuthentificationPage;
