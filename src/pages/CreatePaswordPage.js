import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Stack,
  Container,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { SERVER_ADDRESS } from "../utilities/constants";
import axios from "axios";
import { useAuth } from "../utilities/auth";
import AuthHeader from "../components/AuthHeader";
import { EyeOff, Eye } from "react-feather";

function CreatePasswordPage({ setStep, prevStep }) {
  const [createPassError, setCreatePassError] = useState(null);
  const [confirmPassError, setConfirmPassError] = useState(null);
  const [inputsValues, setInputsValues] = useState({
    create: "",
    confirm: "",
  });
  const auth = useAuth();
  const createPassRef = useRef(null);
  const confirmPassRef = useRef(null);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showCreatePassword, setShowCreatePassword] = useState(false);

  const handleClickShowPassword = (e) => {
    if (e.currentTarget.id === "create-icon") {
      setShowCreatePassword((show) => !show);
    } else if (e.currentTarget.id === "confirm-icon")
      setShowConfirmPassword((show) => !show);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const areInputsEqual = () => {
    let result = false;
    if (inputsValues.create === inputsValues.confirm) {
      result = true;
    } else {
      setConfirmPassError(
        "Перевірте, чи однакові поля створення пароля та підтвердження пароля."
      );
    }
    return result;
  };

  const areInputsFilled = () => {
    let result = false;
    if (inputsValues.create && inputsValues.confirm) result = true;
    if (!inputsValues.create)
      setCreatePassError("Це поле не може бути порожнім.");
    if (!inputsValues.confirm)
      setConfirmPassError("Це поле не може бути порожнім.");
    return result;
  };

  const isLengthEnough = () => {
    let result = false;
    if (inputsValues.create.length >= 8) {
      result = true;
    } else {
      setCreatePassError("Введіть більше 8 символів");
    }
    return result;
  };

  const resetValidaion = () => {
    setCreatePassError(null);
    setConfirmPassError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetValidaion();
    if (!isLengthEnough()) return;
    if (!areInputsFilled()) return;
    if (!areInputsEqual()) return;

    const data = {
      user_id: auth.user,
      set_password_token: auth.createPasswordToken,
      password: inputsValues.create,
    };

    await axios
      .post(`${SERVER_ADDRESS}/api/register/password`, data)
      .then((response) => {
        auth.setcreateusernametoken(response.data.create_username_token);
        setStep(response.data.next_step);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container maxWidth="sm">
      <AuthHeader header="Створити Пароль" subheader="" />
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Stack spacing={2}>
            <TextField
              autoFocus
              id="create-password"
              variant="outlined"
              label="Створіть пароль (більше 8 символів)"
              type={showCreatePassword ? "text" : "password"}
              value={inputsValues.create}
              inputRef={createPassRef}
              onChange={(e) => {
                setInputsValues({ ...inputsValues, create: e.target.value });
              }}
              error={Boolean(createPassError)}
              helperText={createPassError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      id="create-icon"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showCreatePassword ? <EyeOff /> : <Eye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              id="confirm-password"
              variant="outlined"
              label="Підтвердіть пароль"
              type={showConfirmPassword ? "text" : "password"}
              value={inputsValues.confirm}
              error={Boolean(confirmPassError)}
              inputRef={confirmPassRef}
              helperText={confirmPassError}
              onChange={(e) => {
                setInputsValues({ ...inputsValues, confirm: e.target.value });
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      id="confirm-icon"
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? <EyeOff /> : <Eye />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
          <Button variant="contained" type="submit" fullWidth>
            Зберегти
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default CreatePasswordPage;
