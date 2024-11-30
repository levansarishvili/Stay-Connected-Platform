import React from "react";
import ButtonComponent from "./Button";

const AuthButtons = ({
  loginBtn,
  registerBtn,
}: {
  loginBtn: boolean;
  registerBtn: boolean;
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-5">
      <ButtonComponent
        buttonText={"Sign In"}
        activeBtn={loginBtn}
        href={"/login"}
      />
      <ButtonComponent
        buttonText={"Register"}
        activeBtn={registerBtn}
        href={"/register"}
      />
    </div>
  );
};

export default AuthButtons;
