import { useState } from "react";
import { SERVER_ADDRESS } from "../utilities/constants";
import axios from "axios";
import { useAuth } from "../utilities/auth";
import {
  Box,
  TextField,
  Button,
  Stack,
  Container,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import AuthHeader from "../components/AuthHeader";
import AuthBottom from "../components/AuthBottom";
import { Eye, EyeOff } from "react-feather";

function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: true,
  });

  const navigate = useNavigate();
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: formData.email,
      password: formData.password,
    };

    await axios
      .post(`${SERVER_ADDRESS}/api/login`, data)
      .then((response) => {
        console.log("Response:", response);
        auth.login({ ...auth.user, key: response.data.key });
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const [showPassword, setShowPassword] = useState(false);

  const handleEmail = (e) => {
    setFormData(() => {
      return {
        ...formData,
        email: e.target.value,
      };
    });
  };
  const handlePassword = (e) => {
    setFormData(() => {
      return {
        ...formData,
        password: e.target.value,
      };
    });
  };
  const handleRemember = (e) => {
    setFormData(() => {
      return {
        ...formData,
        remember: e.target.checked,
      };
    });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Container maxWidth="sm">
      <AuthHeader header="Вхід" subheader="Даруйте подарунки з любов’ю" />

      <form onSubmit={handleSubmit}>
        <Stack>
          <Stack spacing={5}>
            <Box>
              <Stack spacing={2}>
                <TextField
                  autoFocus
                  id="email"
                  variant="outlined"
                  label="Введіть Email"
                  type="email"
                  value={formData.email}
                  onChange={handleEmail}
                />
                <TextField
                  id="password"
                  variant="outlined"
                  label="Введіть Пароль"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handlePassword}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {showPassword ? <EyeOff /> : <Eye />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Stack>

              <Stack
                direction="row"
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.remember}
                      onChange={handleRemember}
                    />
                  }
                  label="Запам’ятати мене"
                />
                <Link>Не пам’ятаю пароль</Link>
              </Stack>
            </Box>
            <Button variant="contained" type="submit">
              Увійти
            </Button>
          </Stack>

          {/* <Button variant="contained" color="secondary">
            Увійти з Google
          </Button> */}
        </Stack>
      </form>
      <AuthBottom
        text="Немає акаунту?"
        linkText="Зареєструватися"
        to="../resgistration"
      />
    </Container>
  );
}

export default LoginPage;
