import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  if (accessToken) {
    redirect("/home");
  }
  return <div className="h-screen text-center">{children}</div>;
}
