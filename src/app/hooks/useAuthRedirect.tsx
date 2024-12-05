"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAccessToken } from "../../lib/cookies"; // Import your helper functions

export function useAuthRedirect() {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check if there is an access token in cookies
    const accessToken = getAccessToken();

    if (accessToken) {
      // If the access token exists, the user is logged in, redirect to home page
      router.push("/home");
    } else {
      // If not logged in, set loading to false and stay on login page
      setLoading(false);
    }
  }, [router]);

  return loading;
}
