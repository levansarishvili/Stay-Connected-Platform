import React from "react";
import InputComponent from "../components/Input";
import AuthButtons from "../components/AuthButtons";

const LoginPage = () => {
  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 mx-auto">
      <form className="w-[500px] h-auto p-5 sm:p-10 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:mainText">
          Log In
        </h2>
        <InputComponent placeholder={"Login"} />
        <InputComponent placeholder={"Password"} />
        <AuthButtons />
      </form>
    </section>
  );
};

export default LoginPage;
