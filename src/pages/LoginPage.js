import { useState } from "react";
import { useAuth } from "../utilities/auth";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Stack,
  Container,
} from "@mui/material";
import { useNavigate, useLocation, Link } from "react-router-dom";

function LoginPage() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ pb: 6 }}>
        <Typography variant="h2" component="h1">
          Вхід
        </Typography>
        <Typography variant="body2">Даруйте подарунки з любов’ю</Typography>
      </Box>
      <form>
        <Stack spacing={4}>
          <FormControl>
            <InputLabel htmlFor="my-input">Введіть Email</InputLabel>
            <OutlinedInput
              autoFocus
              id="my-input"
              variant="outlined"
              label="Введіть Email"
              type="email"
            />
          </FormControl>
          <FormControl>
            <InputLabel htmlFor="my-input">Введіть Email</InputLabel>
            <OutlinedInput
              id="my-input"
              variant="outlined"
              label="Введіть Email"
              type="password"
            />
          </FormControl>
          <Button variant="contained" type="submit">
            Увійти
          </Button>
          <Button variant="contained" color="secondary">
            Увійти з Google
          </Button>
        </Stack>
      </form>
      <Typography variant="body2">
        Немає акаунту?<Link to="/">Зареєструватися</Link>
      </Typography>
    </Container>
  );
}

export default LoginPage;
