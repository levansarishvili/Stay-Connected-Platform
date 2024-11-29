import React from "react";
import InputComponent from "../components/Input";
import AuthButtons from "../components/AuthButtons";
import AuthSection from "../components/AuthSection";

const LoginPage = () => {
  return (
    <AuthSection authType="Log In">
      <InputComponent inputType={"email"} placeholder={"Login"} />
      <InputComponent inputType={"password"} placeholder={"Password"} />
      <AuthButtons loginBtn={true} registerBtn={false} />
    </AuthSection>
  );
};

export default LoginPage;
