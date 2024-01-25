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
  Link,
} from "@mui/material";
import { useState } from "react";
import { SERVER_ADDRESS, CLIENT_ID } from "../utilities/constants";
import axios from "axios";
import { useAuth } from "../utilities/auth";
import AuthHeader from "../components/AuthHeader";
import AuthBottom from "../components/AuthBottom";

// import { GoogleLogin } from "@leecheuk/react-google-login";

function RegistrationPage({ setStep, prevStep }) {
  const [userEmail, setUserEmail] = useState("");
  const [userEmailErr, setUserEmailErr] = useState(null);
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
        setStep(response.data.next_step);
        auth.login(response.data.user_id);
      })
      .catch((error) => {
        console.error("Error:", error);
        setUserEmailErr(error.response.data.error);
        if (error.response.data.error.email) {
          setUserEmailErr(error.response.data.error.email);
        }
      });
  };

  // const handleSuccess = (res) => {
  //   console.log("logged in", res);
  // };
  // const handleFailure = (res) => {
  //   console.log("failure", res);
  // };

  return (
    <Container maxWidth="sm">
      <AuthHeader header="Реєстрація" subheader="Даруйте подарунки з любов’ю" />
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <TextField
            autoFocus
            id="email"
            variant="outlined"
            label="Введіть Email"
            type="text"
            value={userEmail}
            onChange={handleEmailInput}
            error={Boolean(userEmailErr)}
            helperText={userEmailErr}
          />
          <Button variant="contained" type="submit">
            Зареєструватися через Email
          </Button>
          {/* <GoogleLogin
            clientId={CLIENT_ID}
            buttonText="Зареєструватися через Google"
            cookiePolicy={"single_host_origin"}
            isSignedIn={true}
            onSuccess={handleSuccess}
            onFailure={handleSuccess}
          /> */}

          {/* <Button variant="contained" color="secondary">
            Зареєструватися через Google
          </Button> */}
        </Stack>
      </form>
      <AuthBottom text="Вже маєте акаунт?" linkText="Увійти" to="../login" />
    </Container>
  );
}

export default RegistrationPage;
