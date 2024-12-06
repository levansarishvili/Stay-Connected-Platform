"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "../../lib/cookies"; // Import your helper functions

export function useAuthRedirect() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const accessToken = getAccessToken();

    if (accessToken) {
      router.push("/home");
    } else {
      setLoading(false);
    }
  }, [router]);

  return loading;
}
