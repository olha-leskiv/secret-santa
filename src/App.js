import { Route, Routes } from "react-router-dom";
import Profile from "./pages/Profile";
import { AuthProvider, useAuth } from "./utilities/auth";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./utilities/RequireAuth";
import AuthentificationPage from "./pages/AuthentificationPage";
import { CssBaseline } from "@mui/material";
import { THEME } from "./utilities/constants";
import { ThemeProvider } from "@mui/material/styles";
import Authetification from "./pages/Authetification";
import Home from "./pages/Home";

function App() {
  return (
    <ThemeProvider theme={THEME}>
      <CssBaseline />
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<Home />}>
              <Route path="auth" element={<Authetification />}></Route>
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
