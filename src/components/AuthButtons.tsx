import React from "react";
import ButtonComponent from "./Button";

const AuthButtons = ({
  loginBtn,
  registerBtn,
  onLoginClick,
  onRegisterClick,
  isLoginPage,
}: {
  loginBtn: boolean;
  registerBtn: boolean;
  onLoginClick: () => void;
  onRegisterClick: () => void;
  isLoginPage: boolean;
}) => {
  return (
    <div className="flex flex-col sm:flex-row gap-5">
      {/* Login Button */}
      <ButtonComponent
        type={isLoginPage ? "submit" : "button"}
        buttonText={"Sign In"}
        activeBtn={loginBtn}
        onClick={!isLoginPage ? onLoginClick : undefined}
      />

      {/* Register Button */}
      <ButtonComponent
        type={!isLoginPage ? "submit" : "button"}
        buttonText={"Register"}
        activeBtn={registerBtn}
        onClick={isLoginPage ? onRegisterClick : undefined}
      />
    </div>
  );
};

export default AuthButtons;
