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
import { Route, Routes } from "react-router-dom";

function AuthentificationPage() {
  const [step, setStep] = useState("REGISTER_EMAIL");
  const [prevStep, setPrevStep] = useState("REGISTER_EMAIL");
  let componentToRender;

  switch (step) {
    case "REGISTER_EMAIL":
      componentToRender = (
        <RegistrationPage setStep={setStep} prevStep={prevStep} />
      );
      break;
    case "VERIFY_EMAIL":
      componentToRender = (
        <VerifyCodePage setStep={setStep} prevStep={prevStep} />
      );
      break;
    case "CREATE_PASSWORD":
      componentToRender = (
        <CreatePasswordPage setStep={setStep} prevStep={prevStep} />
      );
      break;
    case "CREATE_USERNAME":
      componentToRender = (
        <CreateUsernamePage setStep={setStep} prevStep={prevStep} />
      );
      break;
    default:
      componentToRender = <div>Unknown step</div>;
  }
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
        {componentToRender}
        <Box />
      </Box>
    </Box>
  );
}

export default AuthentificationPage;
