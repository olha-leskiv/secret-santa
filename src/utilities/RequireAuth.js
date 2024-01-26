import { Navigate, useLocation } from "react-router-dom";

function RequireAuth({ children }) {
  const location = useLocation();

  if (!localStorage.getItem("key")) {
    return <Navigate to="auth/login" state={{ path: location.pathname }} />;
  }

  return children;
}

export default RequireAuth;
