import { useAuth } from "../utilities/auth";
import { Stack, Button, Typography } from "@mui/material";

function Home() {
  const auth = useAuth();

  return (
    <Stack>
      <Typography variant="h2" textAlign="center">
        Welcome Home
      </Typography>
      <Button variant="contained" onClick={(e) => auth.logout()}>
        Logout
      </Button>
    </Stack>
  );
}

export default Home;
