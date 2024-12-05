import React from "react";
import Register from "../../../components/RegisterForm";
import { getAccessToken } from "@/lib/cookies";

const RegisterPage = async () => {
  const accessToken = getAccessToken();

  if (accessToken) {
    return <p>You are already logged in!</p>;
  }

  console.log(accessToken);

  return (
    <main className="flex min-h-screen items-center justify-center">
      <Register />
    </main>
  );
};

export default RegisterPage;
