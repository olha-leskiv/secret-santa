import { useState } from "react";
import RegistrationPage from "./RegistrationPage";
import VerifyCodePage from "./VerifyCodePage";

function AuthentificationPage() {
  const [responseData, setResponseData] = useState("REGISTER_EMAIL");
  const nextStep = responseData.next_step;
  let componentToRender;

  switch (nextStep) {
    case "REGISTER_EMAIL":
      componentToRender = (
        <RegistrationPage setResponseData={setResponseData} />
      );
      break;
    case "VERIFY_EMAIL_WITH_CODE":
      componentToRender = <VerifyCodePage setResponseData={setResponseData} />;
      break;
    case "CREATE_PASSWORD":
      componentToRender = "CreatePassword";
      break;
    default:
      componentToRender = <div>Unknown step</div>;
  }
  return { componentToRender };
}

export default AuthentificationPage;
