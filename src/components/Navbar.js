import { Link } from "react-router-dom";
import { useAuth } from "../utilities/auth";

function Navbar() {
  const auth = useAuth();

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/authetification">Authetification</Link>
      <Link to="/profile">Profile</Link>
      {!auth.user && <Link to="/login">Login</Link>}
    </nav>
  );
}

export default Navbar;
