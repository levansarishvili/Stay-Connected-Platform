import React from "react";
import ButtonComponent from "./Button";

const AuthButtons = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-5">
      <ButtonComponent buttonText={"Sign In"} activeBtn href={"/login"} />
      <ButtonComponent
        buttonText={"Register"}
        activeBtn={false}
        href={"/register"}
      />
    </div>
  );
};

export default AuthButtons;
