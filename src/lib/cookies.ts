import { cookies } from "next/headers";

export const getAccessToken = () => {
  const cookieStore = cookies();
  return cookieStore.get("accessToken")?.value;
};

export const getRefreshToken = () => {
  const cookieStore = cookies();
  return cookieStore.get("refreshToken")?.value;
};
