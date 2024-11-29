import React from "react";
import InputComponent from "../components/Input";
import AuthButtons from "../components/AuthButtons";
import AuthSection from "../components/AuthSection";

const Register = () => {
  return (
    <AuthSection authType="Register">
      <InputComponent placeholder={"Login"} />
      <InputComponent placeholder={"Password"} />
      <InputComponent placeholder={"Confirm password"} />
      <AuthButtons loginBtn={false} registerBtn={true} />
    </AuthSection>
  );
};

export default Register;
