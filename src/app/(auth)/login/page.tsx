"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

import AuthButtons from "../../../components/AuthButtons";
import AuthSection from "../../../components/AuthSection";
import InputComponent from "../../../components/Input";

const FormSchema = z.object({
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .min(1, {
      message: "Email is required",
    }),
  password: z
    .string()
    .min(6, {
      message: "Password must be at least 6 characters.",
    })
    .max(20, {
      message: "Password must not exceed 20 characters.",
    })
    .min(1, {
      message: "Password is required",
    }),
});

const LoginPage = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await axios.post("/api/login", data);
      console.log(response.data);

      toast({
        title: "Login Successful",
        description: "You are now logged in!",
      });

      window.location.href = "/home";
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast({ title: "Error", description: error.message });
      } else {
        toast({ title: "Error", description: "An unexpected error occurred" });
      }
    }
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

        <AuthButtons loginBtn={true} registerBtn={false} />
      </form>
    </AuthSection>
  );
};

export default LoginPage;
