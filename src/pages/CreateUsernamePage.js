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
} from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import { SERVER_ADDRESS } from "../utilities/constants";
import axios from "axios";
import { useAuth } from "../utilities/auth";
import AuthHeader from "../components/AuthHeader";

function CreateUsernamePage({ setStep, prevStep }) {
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState(null);
  const auth = useAuth();
  const navigate = useNavigate("");

  const handleUsernameInput = (e) => {
    setUsername(e.target.value);
  };

  const areInputsFilled = () => {
    let result = false;
    if (username) result = true;
    if (!username) setUsernameError("This field may not be blank.");
    return result;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!areInputsFilled) return;

    const data = {
      user_id: auth.user.id,
      create_username_token: auth.user.usernametoken,
      username: username,
    };

    await axios
      .post(`${SERVER_ADDRESS}/api/register/username`, data)
      .then((response) => {
        console.log("Response:", response);
        auth.log({ ...auth.user, key: response.data.key });
        navigate("/");
      })
      .catch((error) => {
        console.error("Error:", error);
        setUsernameError(error.response.data.error.username);
      });
  };

  return (
    <Container maxWidth="sm">
      <AuthHeader
        header="Вітаю!"
        subheader={
          "Як до тебе звертатися? Це ім’я бачитимуть інші учасники скриньки та ваш таємний Санта."
        }
      />
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <TextField
              autoFocus
              id="username"
              variant="outlined"
              label="Ваше ім’я"
              type="text"
              error={Boolean(usernameError)}
              helperText={usernameError}
              onChange={handleUsernameInput}
              value={username}
            />
          </FormControl>
          <Button variant="contained" type="submit">
            Далі
          </Button>
        </Stack>
      </form>
    </Container>
  );
}

export default CreateUsernamePage;
