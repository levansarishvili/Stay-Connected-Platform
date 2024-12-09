import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function page() {
  const accessToken = cookies().get("accessToken")?.value;
  if (accessToken) {
    redirect("/home");
  } else {
    redirect("/login");
  }
  return;
}
