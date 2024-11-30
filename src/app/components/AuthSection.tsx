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
      <form className="w-[500px] h-auto p-8 sm:p-16 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg shadow-lg space-y-10 text-center">
        <h2 className="text-5xl sm:text-6xl font-bold text-gray-800 dark:mainText">
          {authType}
        </h2>
        {children}
      </form>
    </section>
  );
};

export default AuthSection;
