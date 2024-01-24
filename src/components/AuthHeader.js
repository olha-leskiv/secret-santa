import { Box, Typography } from "@mui/material";

function AuthHeader({ header, subheader }) {
  return (
    <Box sx={{ pb: 6 }}>
      <Typography
        variant="h2"
        component="h1"
        textAlign="center"
        sx={{ pb: 1.75 }}
      >
        {header}
      </Typography>
      <Typography variant="body1" textAlign="center">
        {subheader}
      </Typography>
    </Box>
  );
}

export default AuthHeader;
