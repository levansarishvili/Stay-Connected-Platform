import React from "react";
import ButtonComponent from "../components/Button";
import InputComponent from "../components/Input";

const LoginPage = () => {
  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 mx-auto">
      <form className="w-[500px] h-auto p-5 sm:p-10 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:mainText">
          Log In
        </h2>
        <InputComponent placeholder={"Login"} />
        <InputComponent placeholder={"Password"} />
        <div className="flex flex-col sm:flex-row gap-5">
          <ButtonComponent buttonText={"Sign In"} activeBtn href={"/login"} />
          <ButtonComponent
            buttonText={"Register"}
            activeBtn={false}
            href={"/register"}
          />
        </div>
      </form>
    </section>
  );
};

export default LoginPage;
