"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import AuthButtons from "@/components/AuthButtons";
import AuthSection from "@/components/AuthSection";
import InputComponent from "@/components/Input";
import { useRouter } from "next/navigation";

const LoginSchema = z.object({
  email: z.string().email("Enter a valid email").nonempty("Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters."),
});

const LoginPage = () => {
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: { email: "", password: "" },
  });

  const router = useRouter();

  async function onSubmit(data: z.infer<typeof LoginSchema>) {
    try {
      // Simulate login API call
      console.log("Logging in:", data);
      toast({ title: "Login Successful", description: "Welcome!" });
      router.push("/home");
    } catch (err) {
      toast({ title: "Error", description: "Login failed" });
    }
  }

  function handleRegisterRedirect() {
    router.push("/register");
  }

  return (
    <AuthSection authType="Log In">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-10">
        <InputComponent
          inputType="email"
          placeholder="Email"
          register={form.register("email")}
          error={form.formState.errors.email}
        />
        <InputComponent
          inputType="password"
          placeholder="Password"
          register={form.register("password")}
          error={form.formState.errors.password}
        />
        <AuthButtons
          loginBtn={true}
          registerBtn={false}
          onLoginClick={() => router.push("/login")}
          onRegisterClick={handleRegisterRedirect}
          isLoginPage={true}
        />
      </form>
    </AuthSection>
  );
};

export default LoginPage;
