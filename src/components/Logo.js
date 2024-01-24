import { Box, Typography, Stack } from "@mui/material";

function Logo() {
  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
    >
      <Box
        sx={{ backgroundColor: "secondary.main", height: "1px", width: "100%" }}
      />
      <Typography variant="h6">Таємний{"\u00A0"}Санта</Typography>
      <Box
        sx={{ backgroundColor: "secondary.main", height: "1px", width: "100%" }}
      />
    </Stack>
  );
}

export default Logo;
