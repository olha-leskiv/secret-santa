import { Route, Routes } from "react-router-dom";
import Authetification from "./pages/Authetification";
import Profile from "./pages/Profile";
import { AuthProvider, useAuth } from "./utilities/auth";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./utilities/RequireAuth";
import Registration from "./pages/RegistrationPage";
import test from "./utilities/api";
import VerifyCodePage from "./pages/VerifyCodePage";
import CreatePasswordPage from "./pages/CreatePaswordPage";

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Routes>
          <Route path="/" element={<Registration />}></Route>
          <Route path="/verifycode" element={<VerifyCodePage />}></Route>
          <Route
            path="/createpassword"
            element={<CreatePasswordPage />}
          ></Route>
          <Route path="authetification" element={<Authetification />}></Route>
          <Route
            path="profile"
            element={
              <RequireAuth>
                <Profile />
              </RequireAuth>
            }
          ></Route>
          <Route path="login" element={<LoginPage />}></Route>
        </Routes>
      </div>
    </AuthProvider>
  );
}

export default App;
