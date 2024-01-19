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
import { useNavigate, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { SERVER_ADDRESS } from "../utilities/constants";
import axios from "axios";
import { useAuth } from "../utilities/auth";

function CreatePasswordPage() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/verifycode");
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ pb: 6 }}>
        <Typography variant="h2" component="h1">
          Створити Пароль
        </Typography>
      </Box>
      <form>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <FormControl>
              <InputLabel htmlFor="create-password">Створіть пароль</InputLabel>
              <OutlinedInput
                autoFocus
                id="create-password"
                variant="outlined"
                label="Створіть пароль"
                type="password"
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="confirm-password">
                Підтвердіть пароль
              </InputLabel>
              <OutlinedInput
                id="confirm-password"
                variant="outlined"
                label="Підтвердіть пароль"
                type="password"
              />
            </FormControl>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={handleBack}
          >
            Назад
          </Button>
          <Button variant="contained" type="submit" fullWidth>
            Далі
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default CreatePasswordPage;
