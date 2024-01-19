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

function VerifyCodePage() {
  const navigate = useNavigate();
  const auth = useAuth();
  const input1Ref = useRef(null);
  const input2Ref = useRef(null);
  const input3Ref = useRef(null);
  const input4Ref = useRef(null);
  const input5Ref = useRef(null);
  const input6Ref = useRef(null);

  const [formData, setFormData] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
    input6: "",
  });
  const [focusedInput, setFocusedInput] = useState("input1");
  useEffect(() => {
    switch (focusedInput) {
      case "input1":
        input1Ref.current.focus();
        break;
      case "input2":
        input2Ref.current.focus();
        break;
      case "input3":
        input3Ref.current.focus();
        break;
      case "input4":
        input4Ref.current.focus();
        break;
      case "input5":
        input5Ref.current.focus();
        break;
      case "input6":
        input6Ref.current.focus();
        break;
      default:
        break;
    }
  }, [focusedInput]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value < 0 || value > 9) return;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    e.target.blur();
    setFocusedInput("input" + (Number(name.substr(5, 1)) + 1));
  };
  const handleBack = () => {
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { input1, input2, input3, input4, input5, input6 } = formData;
    if (!input1 || !input2 || !input3 || !input4 || !input5 || !input6) return;

    let user = {
      user_id: auth.user,
      verification_code: `${input1}${input2}${input3}${input4}${input5}${input6}`,
    };

    await axios
      .post(`${SERVER_ADDRESS}/api/register/email-verification-code`, user)
      .then((response) => {
        console.log("Response:", response);
        navigate("/createpassword");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ pb: 6 }}>
        <Typography variant="h2" component="h1">
          Введіть Код
        </Typography>
        <Typography variant="body2">
          На вашу поштову скриньку було відправлено код. Введіть його нижче.
        </Typography>
      </Box>
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <Stack direction="row" spacing={2}>
            <OutlinedInput
              name="input1"
              fullWidth
              variant="outlined"
              type="num"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                step: 1,
                min: 0,
                max: 1,
              }}
              value={formData.input1}
              onChange={handleChange}
              inputRef={input1Ref}
            />
            <OutlinedInput
              name="input2"
              fullWidth
              variant="outlined"
              type="num"
              inputProps={{
                inputMode: "numeric",
                pattern: "[0-9]*",
                step: 1,
                min: 0,
                max: 9,
              }}
              value={formData.input2}
              onChange={handleChange}
              inputRef={input2Ref}
            />
            <OutlinedInput
              name="input3"
              variant="outlined"
              type="num"
              fullWidth
              value={formData.input3}
              onChange={handleChange}
              inputRef={input3Ref}
            />
            <OutlinedInput
              name="input4"
              variant="outlined"
              type="num"
              fullWidth
              value={formData.input4}
              onChange={handleChange}
              inputRef={input4Ref}
            />
            <OutlinedInput
              name="input5"
              variant="outlined"
              type="num"
              fullWidth
              value={formData.input5}
              onChange={handleChange}
              inputRef={input5Ref}
            />
            <OutlinedInput
              name="input6"
              variant="outlined"
              type="num"
              fullWidth
              value={formData.input6}
              onChange={handleChange}
              inputRef={input6Ref}
            />
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
        </Stack>
      </form>
      <Typography variant="body2">
        Не отримали код?<Link to="/login">Відправити ще раз</Link>
      </Typography>
    </Container>
  );
}

export default VerifyCodePage;
