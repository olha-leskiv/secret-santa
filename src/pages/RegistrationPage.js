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
import { useState } from "react";
import { SERVER_ADDRESS } from "../utilities/constants";
import axios from "axios";
import { useAuth } from "../utilities/auth";

function RegistrationPage({ setResponseData }) {
  const [userEmail, setUserEmail] = useState();
  const navigate = useNavigate();
  const auth = useAuth();

  const handleEmailInput = (e) => {
    setUserEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = {
      email: userEmail,
    };

    await axios
      .post(`${SERVER_ADDRESS}/api/register/email`, user)
      .then((response) => {
        console.log("Response:", response);
        setResponseData(response.data);
        auth.login(response.data.user_id);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ pb: 6 }}>
        <Typography variant="h2" component="h1">
          Реєстрація
        </Typography>
        <Typography variant="body2">Даруйте подарунки з любов’ю</Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <InputLabel htmlFor="email">Введіть Email</InputLabel>
            <OutlinedInput
              autoFocus
              id="email"
              variant="outlined"
              label="Введіть Email"
              type="email"
              onChange={handleEmailInput}
            />
          </FormControl>
          <Button variant="contained" type="submit">
            Зареєструватися через Email
          </Button>
          <Button variant="contained" color="secondary">
            Зареєструватися через Google
          </Button>
        </Stack>
      </form>
      <Typography variant="body2">
        Вже маєте акаунт?<Link to="/login">Увійти</Link>
      </Typography>
    </Container>
  );
}

export default RegistrationPage;
