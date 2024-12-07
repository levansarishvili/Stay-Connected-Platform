import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Header from "../../components/Header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookiesStore = cookies();
  const accessToken = cookiesStore.get("accessToken")?.value;
  if (!accessToken) {
    redirect("/login");
  }
  return (
    <div className="h-screen text-center">
      <Header />
      {children}
    </div>
  );
}
