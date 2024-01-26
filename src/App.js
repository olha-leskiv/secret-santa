import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import Profile from "./pages/Profile";
import { AuthProvider, useAuth } from "./utilities/auth";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./utilities/RequireAuth";
import AuthentificationPage from "./pages/AuthentificationPage";
import { CssBaseline } from "@mui/material";
import { THEME } from "./utilities/constants";
import { ThemeProvider } from "@mui/material/styles";
import Home from "./pages/Home";
import RegistrationPage from "./pages/RegistrationPage";
import VerifyCodePage from "./pages/VerifyCodePage";
import CreatePasswordPage from "./pages/CreatePaswordPage";
import CreateUsernamePage from "./pages/CreateUsernamePage";
import { useEffect, useState } from "react";

function App() {
  const [step, setStep] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    switch (step) {
      case "REGISTER_EMAIL":
        navigate("auth/resgistration");
        break;
      case "VERIFY_EMAIL":
        navigate("auth/verification");
        break;
      case "CREATE_PASSWORD":
        navigate("auth/password");
        break;
      case "CREATE_USERNAME":
        navigate("auth/username");
        break;
      default:
        navigate("/");
    }
  }, [step]);

  return (
    <ThemeProvider theme={THEME}>
      <CssBaseline />
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            ></Route>
            <Route path="/auth" element={<AuthentificationPage />}>
              <Route
                path="resgistration"
                element={<RegistrationPage setStep={setStep} />}
              ></Route>
              <Route
                path="verification"
                element={<VerifyCodePage setStep={setStep} />}
              ></Route>
              <Route
                path="password"
                element={<CreatePasswordPage setStep={setStep} />}
              ></Route>
              <Route
                path="username"
                element={<CreateUsernamePage setStep={setStep} />}
              ></Route>
              <Route
                path="login"
                element={<LoginPage setStep={setStep} />}
              ></Route>
            </Route>

            {/* <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            ></Route> */}
            {/* <Route path="login" element={<LoginPage />}></Route> */}
          </Routes>
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
