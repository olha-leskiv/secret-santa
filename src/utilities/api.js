import axios from "axios";
import { SERVER_ADDRESS } from "../utilities/constants";

// Make a POST request with data
const createEmail = async (userData) => {
  const response = await axios
    .post(`${SERVER_ADDRESS}/api/register/email`, userData)
    .then((response) => {
      console.log("Response:", response.status);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  return response;
};

export default createEmail;
