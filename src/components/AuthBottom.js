import { Typography, Link, Stack } from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";

function AuthBottom({ text, linkText, to }) {
  return (
    <Stack
      direction="row"
      spacing={0.5}
      sx={{
        position: "absolute",
        bottom: "50px",
        left: "50%",
        transform: "translateX(-50%)",
      }}
    >
      <Typography variant="body2">{text}</Typography>
      <Typography variant="body2" sx={{ opacity: 1 }}>
        <RouterLink to={to}>
          <Link>{linkText}</Link>
        </RouterLink>
      </Typography>
    </Stack>
  );
}

export default AuthBottom;
