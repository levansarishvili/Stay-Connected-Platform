export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen text-center">
      <main className="main bg-contactBackground w-screen h-screen">
        {children}
      </main>
    </div>
  );
}
