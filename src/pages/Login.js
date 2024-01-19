import { useState } from "react";
import { useAuth } from "../utilities/auth";
import { useNavigate, useLocation } from "react-router-dom";

function LoginPage() {
  const [user, setUser] = useState("");
  const auth = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const redirectPath = location.state?.path || "/";

  const handleLogin = () => {
    auth.login(user);
    navigate(redirectPath, { replace: true });
  };

  return (
    <div>
      LoginPage
      <label>
        Username: {""}
        <input type="text" onChange={(e) => setUser(e.target.value)} />
        <button onClick={handleLogin}>Login</button>
      </label>
    </div>
  );
}

export default LoginPage;
