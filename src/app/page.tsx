"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const LoginPage = () => {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken"))
      ?.split("=")[1];

    if (token) {
      router.push("/home");
    } else {
      setLoading(false);
      router.push("/login");
    }
  }, [router]);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Loading</h1>
    </div>
  );
};

export default LoginPage;
