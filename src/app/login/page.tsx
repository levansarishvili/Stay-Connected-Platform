import React from "react";
import InputComponent from "../components/Input";
import AuthButtons from "../components/AuthButtons";
import AuthSection from "../components/AuthSection";

const LoginPage = () => {
  return (
    <AuthSection authType="Log In">
      <InputComponent placeholder={"Login"} />
      <InputComponent placeholder={"Password"} />
      <AuthButtons />
    </AuthSection>
  );
};

export default LoginPage;
