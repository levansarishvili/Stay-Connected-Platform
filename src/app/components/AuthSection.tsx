import React from "react";
import { AuthProps } from "../types/authType";

const AuthSection = ({
  authType,
  children,
}: {
  authType: AuthProps;
  children: React.ReactNode;
}) => {
  return (
    <section className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 mx-auto">
      <form className="w-[500px] h-auto p-5 sm:p-10 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-6 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:mainText">
          {authType}
        </h2>
        {children}
      </form>
    </section>
  );
};

export default AuthSection;
