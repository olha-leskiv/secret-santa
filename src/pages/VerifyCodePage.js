import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  OutlinedInput,
  Button,
  Stack,
  Container,
  FormHelperText,
} from "@mui/material";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { SERVER_ADDRESS } from "../utilities/constants";
import axios from "axios";
import { useAuth } from "../utilities/auth";
import AuthHeader from "../components/AuthHeader";
import AuthBottom from "../components/AuthBottom";

function VerifyCodePage({ setStep, prevStep }) {
  const [error, setError] = useState(null);
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

  const [timeLeft, setTimeLeft] = useState(60);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeLeft((prevSeconds) => prevSeconds - 1);
    }, 1000);

    if (timeLeft <= 0) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const [focusedInput, setFocusedInput] = useState("input1");
  useEffect(() => {
    switch (focusedInput) {
      case "input1":
        input1Ref.current.focus();
        input1Ref.current.select();
        break;
      case "input2":
        input2Ref.current.focus();
        input2Ref.current.select();
        break;
      case "input3":
        input3Ref.current.focus();
        input3Ref.current.select();
        break;
      case "input4":
        input4Ref.current.focus();
        input4Ref.current.select();
        break;
      case "input5":
        input5Ref.current.focus();
        input5Ref.current.select();
        break;
      case "input6":
        input6Ref.current.focus();
        input6Ref.current.select();
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
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { input1, input2, input3, input4, input5, input6 } = formData;
    if (!input1 || !input2 || !input3 || !input4 || !input5 || !input6) {
      return setError("Введіть 6 цифр");
    }

    let user = {
      user_id: auth.user,
      verification_code: `${input1}${input2}${input3}${input4}${input5}${input6}`,
    };

    await axios
      .post(`${SERVER_ADDRESS}/api/register/email-verification-code`, user)
      .then((response) => {
        console.log("Response:", response);
        auth.setCreatePasswordToken(response.data.set_password_token);
        setStep(response.data.next_step);
      })
      .catch((error) => {
        console.error("Error:", error);
        setError(error.response.data.error.verification_code);
      });
  };

  const handleResendCode = async (e) => {
    let user = {
      user_id: auth.user,
    };

    await axios
      .post(
        `${SERVER_ADDRESS}/api/register/email/resend-verification-code`,
        user
      )
      .then((response) => {
        console.log("Response:", response);
        setTimeLeft(5);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <Container maxWidth="sm">
      <AuthHeader
        header={"Введіть Код"}
        subheader={
          "На вашу поштову скриньку було відправлено код. Введіть його нижче."
        }
      />

      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl>
            <Stack direction="row" spacing={2}>
              <OutlinedInput
                name="input1"
                fullWidth
                variant="outlined"
                type="num"
                value={formData.input1}
                onChange={handleChange}
                inputRef={input1Ref}
                error={Boolean(error)}
              />
              <OutlinedInput
                name="input2"
                fullWidth
                variant="outlined"
                type="num"
                value={formData.input2}
                onChange={handleChange}
                inputRef={input2Ref}
                error={Boolean(error)}
              />
              <OutlinedInput
                name="input3"
                variant="outlined"
                type="num"
                fullWidth
                value={formData.input3}
                onChange={handleChange}
                inputRef={input3Ref}
                error={Boolean(error)}
              />
              <OutlinedInput
                name="input4"
                variant="outlined"
                type="num"
                fullWidth
                value={formData.input4}
                onChange={handleChange}
                inputRef={input4Ref}
                error={Boolean(error)}
              />
              <OutlinedInput
                name="input5"
                variant="outlined"
                type="num"
                fullWidth
                value={formData.input5}
                onChange={handleChange}
                inputRef={input5Ref}
                error={Boolean(error)}
              />
              <OutlinedInput
                name="input6"
                variant="outlined"
                type="num"
                fullWidth
                value={formData.input6}
                onChange={handleChange}
                inputRef={input6Ref}
                error={Boolean(error)}
              />
            </Stack>
            <FormHelperText sx={{ mx: 0 }} error={Boolean(error)}>
              {error}
            </FormHelperText>
          </FormControl>

          <Stack direction="row" spacing={2}>
            <Button variant="outlined" fullWidth onClick={handleBack}>
              Назад
            </Button>
            <Button variant="contained" type="submit" fullWidth>
              Далі
            </Button>
          </Stack>
        </Stack>
      </form>

      <AuthBottom
        text="Не отримали код?"
        linkText={
          timeLeft ? (
            `Відправити ще раз через ${timeLeft}с`
          ) : (
            <Link onClick={handleResendCode}>Відправити код</Link>
          )
        }
        to="/login"
      />
    </Container>
  );
}

export default VerifyCodePage;
